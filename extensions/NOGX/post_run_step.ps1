# Set error handling policy to stop on errors
$ErrorActionPreference = "Stop"

# Get environment variables from GameMaker Studio
$YYPLATFORM_name = $env:YYPLATFORM_name
$YYoutputFolder = $env:YYoutputFolder
$YYprojectName = $env:YYprojectName
$YYTARGET_runtime = $env:YYTARGET_runtime
$YYtempFolder = $env:YYtempFolder
$YYEXTOPT_NOGX_Enable = $env:YYEXTOPT_NOGX_Enable

Write-Host "[NOGX] post_run_step"

# Check if extension is enabled
if ($YYEXTOPT_NOGX_Enable -ne "True") {
	Write-Host "[NOGX] The extension is disabled."
	exit 0
}

# Check if the current platform is Opera GX
Write-Host "[NOGX] Current platform: $YYPLATFORM_name"

# Check if the current platform is Opera GX or HTML5
$isOperaGxPlatform = $YYPLATFORM_name -ieq "Opera GX" -or $YYPLATFORM_name -ieq "operagx"
$isHTML5 = $YYPLATFORM_name -ieq "html5"
if (-not ($isOperaGxPlatform -or $isHTML5)) {
	Write-Host "[NOGX] Aborting: This script is only for Opera GX and HTML5 platform."
	exit 0
}

# Validate required environment variables
if ([string]::IsNullOrWhiteSpace($YYoutputFolder)) {
	Write-Error "[NOGX] ERROR: YYoutputFolder environment variable is not set."
	exit 1
}

if ([string]::IsNullOrWhiteSpace($YYprojectName)) {
	Write-Error "[NOGX] ERROR: YYprojectName environment variable is not set."
	exit 1
}

if ([string]::IsNullOrWhiteSpace($YYTARGET_runtime)) {
	Write-Error "[NOGX] ERROR: YYTARGET_runtime environment variable is not set."
	exit 1
}

if ([string]::IsNullOrWhiteSpace($YYtempFolder)) {
	Write-Error "[NOGX] ERROR: YYtempFolder environment variable is not set."
	exit 1
}

<#
.SYNOPSIS
    Resolves path to 7z.exe using extension option, environment variables, and defaults.
#>
function Get-NOGXSevenZipPath {
	$candidates = @()
	
	if (-not [string]::IsNullOrWhiteSpace($env:YYEXTOPT_NOGX_SevenZipPath)) {
		$candidates += $env:YYEXTOPT_NOGX_SevenZipPath
	}
	
	foreach ($envName in @('SEVEN_ZIP', '7ZIP', '7Z_HOME', '7ZIP_HOME')) {
		$envValue = (Get-Item "env:$envName" -ErrorAction SilentlyContinue).Value
		if ([string]::IsNullOrWhiteSpace($envValue)) {
			continue
		}
		
		if ($envName -match 'HOME$' -and -not $envValue.EndsWith('.exe', [System.StringComparison]::OrdinalIgnoreCase)) {
			$candidates += [System.IO.Path]::Combine($envValue, "7z.exe")
		}
		else {
			$candidates += $envValue
		}
	}
	
	$candidates += @(
		"C:\Program Files\7-Zip\7z.exe",
		"C:\Program Files (x86)\7-Zip\7z.exe"
	)
	
	foreach ($candidate in $candidates) {
		if ([string]::IsNullOrWhiteSpace($candidate)) {
			continue
		}
		
		$resolvedPath = $candidate
		if (-not [System.IO.Path]::IsPathRooted($resolvedPath)) {
			$resolvedPath = [System.IO.Path]::GetFullPath($resolvedPath)
		}
		
		if (Test-Path -Path $resolvedPath -PathType Leaf) {
			Write-Host "[NOGX] Using 7-Zip: '$resolvedPath'"
			return $resolvedPath
		}
	}
	
	Write-Host "[NOGX] 7-Zip not found. runner.wbin will not be created."
	return $null
}

<#
.SYNOPSIS
    Creates runner.wbin (gzip-compressed runner.wasm) in a build output directory.
#>
function Compress-NOGXRunnerWasm {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory)]
		[string]$TargetDir
	)
	
	if ($env:YYEXTOPT_NOGX_EnableCodeCompression -ne "True") {
		Write-Host "[NOGX] Code compression is disabled. Skipping runner.wbin creation."
		return
	}
	
	$sevenZip = Get-NOGXSevenZipPath
	if ($null -eq $sevenZip) {
		return
	}
	
	$wasmFile = [System.IO.Path]::Combine($TargetDir, "runner.wasm")
	if (-not (Test-Path -Path $wasmFile -PathType Leaf)) {
		Write-Host "[NOGX] runner.wasm not found in '$TargetDir'. Skipping compressed wasm creation."
		return
	}
	
	$wbinFile = [System.IO.Path]::Combine($TargetDir, "runner.wbin")
	$legacyGzFile = [System.IO.Path]::Combine($TargetDir, "runner.wasm.gz")
	foreach ($oldFile in @($wbinFile, $legacyGzFile)) {
		if (Test-Path -Path $oldFile -PathType Leaf) {
			Remove-Item -Path $oldFile -Force -ErrorAction SilentlyContinue
		}
	}
	
	Write-Host "[NOGX] Creating 'runner.wbin' from 'runner.wasm'"
	try {
		& $sevenZip @('a', '-tgzip', '-mx=7', '-y', $wbinFile, $wasmFile) | ForEach-Object { Write-Host "[NOGX] $_" }
		if ($LASTEXITCODE -ne 0) {
			Write-Host "[NOGX] WARNING: 7-Zip failed to create runner.wbin (exit code $LASTEXITCODE)."
			if (Test-Path -Path $wbinFile -PathType Leaf) {
				Remove-Item -Path $wbinFile -Force -ErrorAction SilentlyContinue
			}
			return
		}
		
		Write-Host "[NOGX] Created '$wbinFile'"
	}
	catch {
		Write-Host "[NOGX] WARNING: Failed to create runner.wbin: $_"
		if (Test-Path -Path $wbinFile -PathType Leaf) {
			Remove-Item -Path $wbinFile -Force -ErrorAction SilentlyContinue
		}
	}
}

# Main execution block
try {
	if($isHTML5 -and $env:YYEXTOPT_NOGX_EnableInjectionsForHTML5 -ne "True") {
		Write-Host "[NOGX] Aborting: There's nothing to do in HTML5 target."
		exit 0
	}
	
	# Step 1: Show info and validate that output directory exists
	$outputDir = $YYoutputFolder
	if($isOperaGxPlatform) {
		$outputDir = [System.IO.Path]::Combine($YYoutputFolder, "runner")
	}
	
	Write-Host "[NOGX] Project name: $YYprojectName"
	Write-Host "[NOGX] Target runtime: $YYTARGET_runtime"
	Write-Host "[NOGX] Output dir: $outputDir"
	
	if (-not (Test-Path -Path $outputDir -PathType Container)) {
		Write-Error "[NOGX] ERROR: Output directory does not exist: '$outputDir'"
		exit 1
	}
	
	# Step 2: Validate that the processed index.html file exists
	$sourceFile = [System.IO.Path]::Combine($YYtempFolder, "NOGX_index.html")
	if (-not (Test-Path -Path $sourceFile -PathType Leaf)) {
		Write-Error "[NOGX] ERROR: Processed index.html file does not exist: '$sourceFile'"
		Write-Error "[NOGX] Make sure pre_build_step.ps1 completed successfully."
		exit 1
	}
	
	if($isHTML5) {
		# Step 3: Override index.html
		$indexFile = [System.IO.Path]::Combine($outputDir, $env:YYPLATFORM_option_html5_outputname)
		Write-Host "[NOGX] Overriding '$indexFile' by '$sourceFile'"
		Copy-Item -Path $sourceFile -Destination $indexFile -Force -ErrorAction Stop
		
		Compress-NOGXRunnerWasm -TargetDir $outputDir
		
		Write-Host "[NOGX] Done!"
		exit 0
	}
	elseif($isOperaGxPlatform) {
		. (Join-Path $PSScriptRoot "nogx_datafiles.ps1")
		
		# Step 3: Copy Included Files (All / GX.games) into HTML5 Folder name
		try {
			Copy-NOGXDatafilesToDir -OutputDir $outputDir
		}
		catch {
			Write-Error "[NOGX] ERROR: Failed to copy datafiles: $_"
			exit 1
		}
		
		# Step 4: Copy webfiles folder content if it exists (overrides conflicts)
		$webfilesDir = [System.IO.Path]::Combine($PSScriptRoot, "..", "..", "webfiles")
		$webfilesDir = [System.IO.Path]::GetFullPath($webfilesDir)
		Write-Host "[NOGX] Webfiles dir: $webfilesDir"
		
		if (Test-Path -Path $webfilesDir -PathType Container) {
			Write-Host "[NOGX] Copying 'webfiles' folder content."
			try {
				Copy-Item -Path "$webfilesDir\*" -Destination $outputDir -Recurse -Force -ErrorAction Stop
			}
			catch {
				Write-Error "[NOGX] ERROR: Failed to copy webfiles folder content: $_"
				exit 1
			}
		}
		else {
			Write-Host "[NOGX] 'webfiles' folder does not exist. Skipping copy operation."
		}
		
		# Step 5: Process files based on runtime target
		if ($YYTARGET_runtime -ieq "YYC") {
			# YYC (YoYo Compiler) runtime: copy index.html to both index.html and projectName.html
			$indexFile = [System.IO.Path]::Combine($outputDir, "index.html")
			$runnerFile = [System.IO.Path]::Combine($outputDir, "$YYprojectName.html")
			
			Write-Host "[NOGX] Copying index.html for YYC runtime..."
			Copy-Item -Path $sourceFile -Destination $indexFile -Force -ErrorAction Stop
			Copy-Item -Path $sourceFile -Destination $runnerFile -Force -ErrorAction Stop
			
			# Rename projectName.js to runner.js for YYC
			$jsFile = [System.IO.Path]::Combine($outputDir, "$YYprojectName.js")
			if (Test-Path -Path $jsFile -PathType Leaf) {
				$targetJsFile = [System.IO.Path]::Combine($outputDir, "runner.js")
				Write-Host "[NOGX] Renaming '$YYprojectName.js' to 'runner.js'"
				Move-Item -Path $jsFile -Destination $targetJsFile -Force -ErrorAction Stop
			}
		}
		elseif ($YYTARGET_runtime -ieq "VM") {
			# VM (Virtual Machine) runtime: copy index.html to both index.html and runner.html
			$indexFile = [System.IO.Path]::Combine($outputDir, "index.html")
			$runnerFile = [System.IO.Path]::Combine($outputDir, "runner.html")
			
			Write-Host "[NOGX] Copying index.html for VM runtime..."
			Copy-Item -Path $sourceFile -Destination $indexFile -Force -ErrorAction Stop
			Copy-Item -Path $sourceFile -Destination $runnerFile -Force -ErrorAction Stop
		}
		else {
			Write-Error "[NOGX] ERROR: Unknown runtime target '$YYTARGET_runtime'."
			Write-Error "[NOGX] Supported runtime targets: YYC, VM"
			exit 1
		}
		
		Compress-NOGXRunnerWasm -TargetDir $outputDir
	}
	Write-Host "[NOGX] Done."
	exit 0
}
catch {
	Write-Error "[NOGX] FATAL ERROR: $_"
	Write-Error "[NOGX] Stack trace: $($_.ScriptStackTrace)"
	exit 1
}

