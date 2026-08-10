# Shared helpers for copying Included Files (datafiles) into the HTML5 Folder name on GX builds.
# Dot-sourced from post_run_step.ps1 and post_package_step.ps1.

# Opera GX / GX.games platform bit in CopyToMask / copyToTargets
$script:NOGX_CopyToMask_OperaGx = [int64]17179869184

<#
.SYNOPSIS
    Resolves the HTML5 Folder name option used as the output subfolder for datafiles.
#>
function Get-NOGXHtml5FolderName {
	$folderName = $env:YYPLATFORM_option_html5_foldername
	if ([string]::IsNullOrWhiteSpace($folderName)) {
		$folderName = "html5game"
	}
	return $folderName.Trim().Trim('/', '\').Replace('\', '/')
}

<#
.SYNOPSIS
    Returns Included Files marked for All (-1) or Opera GX / GX.games.
.OUTPUTS
    Objects with SourcePath and RelativePath (under the HTML5 folder name, forward slashes).
#>
function Get-NOGXIncludedFilesForGx {
	$projectDir = $env:YYprojectDir
	$projectName = $env:YYprojectName
	
	if ([string]::IsNullOrWhiteSpace($projectDir) -or [string]::IsNullOrWhiteSpace($projectName)) {
		Write-Warning "[NOGX] YYprojectDir or YYprojectName is not set. Skipping datafiles copy."
		return @()
	}
	
	$yypPath = [System.IO.Path]::Combine($projectDir, "$projectName.yyp")
	if (-not (Test-Path -Path $yypPath -PathType Leaf)) {
		Write-Warning "[NOGX] Project file not found: '$yypPath'. Skipping datafiles copy."
		return @()
	}
	
	$yypContent = [System.IO.File]::ReadAllText($yypPath)
	
	# Extract the IncludedFiles array body (GameMaker .yyp is not strict JSON).
	$includedMatch = [regex]::Match(
		$yypContent,
		'"IncludedFiles"\s*:\s*\[(?<body>[\s\S]*?)\]\s*,',
		[System.Text.RegularExpressions.RegexOptions]::CultureInvariant
	)
	
	if (-not $includedMatch.Success) {
		Write-Host "[NOGX] No IncludedFiles section found in project. Skipping datafiles copy."
		return @()
	}
	
	$body = $includedMatch.Groups['body'].Value
	$entryPattern = '\{[^{}]*"\$GMIncludedFile"[^{}]*\}|\{[^{}]*"resourceType"\s*:\s*"GMIncludedFile"[^{}]*\}'
	$entries = [regex]::Matches($body, $entryPattern, [System.Text.RegularExpressions.RegexOptions]::CultureInvariant)
	
	$folderName = Get-NOGXHtml5FolderName
	$result = New-Object System.Collections.Generic.List[object]
	
	foreach ($entryMatch in $entries) {
		$entryText = $entryMatch.Value
		
		$maskMatch = [regex]::Match($entryText, '"CopyToMask"\s*:\s*(-?\d+)')
		$pathMatch = [regex]::Match($entryText, '"filePath"\s*:\s*"([^"]*)"')
		$nameMatch = [regex]::Match($entryText, '"name"\s*:\s*"([^"]*)"')
		
		if (-not ($maskMatch.Success -and $pathMatch.Success -and $nameMatch.Success)) {
			continue
		}
		
		$copyToMask = [int64]$maskMatch.Groups[1].Value
		$filePath = $pathMatch.Groups[1].Value.Replace('\', '/')
		$fileName = $nameMatch.Groups[1].Value
		
		$isAll = ($copyToMask -eq -1)
		$isGx = (($copyToMask -band $script:NOGX_CopyToMask_OperaGx) -ne 0)
		if (-not ($isAll -or $isGx)) {
			continue
		}
		
		$sourcePath = [System.IO.Path]::Combine($projectDir, $filePath.Replace('/', [System.IO.Path]::DirectorySeparatorChar), $fileName)
		
		if (-not (Test-Path -Path $sourcePath -PathType Leaf)) {
			Write-Warning "[NOGX] Included file missing on disk, skipping: '$sourcePath'"
			continue
		}
		
		# Relative path under datafiles/
		$relativeUnderDatafiles = ""
		if ($filePath -ieq "datafiles") {
			$relativeUnderDatafiles = $fileName
		}
		elseif ($filePath -like "datafiles/*" -or $filePath -like "datafiles\*") {
			$subPath = $filePath.Substring("datafiles/".Length).TrimStart('/', '\')
			if ([string]::IsNullOrWhiteSpace($subPath)) {
				$relativeUnderDatafiles = $fileName
			}
			else {
				$relativeUnderDatafiles = ($subPath + "/" + $fileName).Replace('\', '/')
			}
		}
		else {
			# Unexpected filePath layout — keep as-is under folder name
			$relativeUnderDatafiles = ($filePath.TrimStart('/', '\') + "/" + $fileName).Replace('\', '/')
		}
		
		$relativePath = ($folderName + "/" + $relativeUnderDatafiles).Replace('\', '/')
		
		$result.Add([pscustomobject]@{
			SourcePath   = $sourcePath
			RelativePath = $relativePath
		}) | Out-Null
	}
	
	return $result.ToArray()
}

<#
.SYNOPSIS
    Copies GX-targeted Included Files into OutputDir/<Folder name>/.
#>
function Copy-NOGXDatafilesToDir {
	param(
		[Parameter(Mandatory)]
		[string]$OutputDir
	)
	
	$files = @(Get-NOGXIncludedFilesForGx)
	if ($files.Count -eq 0) {
		Write-Host "[NOGX] No Included Files with All or GX.games targets to copy."
		return
	}
	
	$folderName = Get-NOGXHtml5FolderName
	Write-Host "[NOGX] Copying $($files.Count) included file(s) to '$folderName/'..."
	
	foreach ($file in $files) {
		$destPath = [System.IO.Path]::Combine($OutputDir, $file.RelativePath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
		$destDir = [System.IO.Path]::GetDirectoryName($destPath)
		
		if (-not (Test-Path -Path $destDir -PathType Container)) {
			New-Item -Path $destDir -ItemType Directory -Force | Out-Null
		}
		
		Write-Host "[NOGX] Copying '$($file.RelativePath)'"
		Copy-Item -Path $file.SourcePath -Destination $destPath -Force -ErrorAction Stop
	}
}

<#
.SYNOPSIS
    Adds GX-targeted Included Files into an open ZipArchive under <Folder name>/.
#>
function Add-NOGXDatafilesToZip {
	param(
		[Parameter(Mandatory)]
		$Zip
	)
	
	$files = @(Get-NOGXIncludedFilesForGx)
	if ($files.Count -eq 0) {
		Write-Host "[NOGX] No Included Files with All or GX.games targets to add to ZIP."
		return
	}
	
	$folderName = Get-NOGXHtml5FolderName
	Write-Host "[NOGX] Adding $($files.Count) included file(s) to '$folderName/' in ZIP..."
	
	foreach ($file in $files) {
		$relativePath = $file.RelativePath.Replace('\', '/')
		
		$entry = $Zip.GetEntry($relativePath)
		if ($null -ne $entry) {
			$entry.Delete()
		}
		
		Write-Host "[NOGX] Adding '$relativePath'"
		[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($Zip, $file.SourcePath, $relativePath) | Out-Null
	}
}
