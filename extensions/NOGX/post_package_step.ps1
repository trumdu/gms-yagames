# Set error handling policy to stop on errors
$ErrorActionPreference = "Stop"

# Get environment variables from GameMaker Studio
$YYPLATFORM_name = $env:YYPLATFORM_name
$YYtargetFile = $env:YYtargetFile
$YYprojectName = $env:YYprojectName
$YYTARGET_runtime = $env:YYTARGET_runtime
$YYtempFolder = $env:YYtempFolder
$YYEXTOPT_NOGX_Enable = $env:YYEXTOPT_NOGX_Enable
$YYEXTOPT_NOGX_YaFix = $env:YYEXTOPT_NOGX_YaFix

Write-Host "[NOGX] post_package_step"

# Check if extension is enabled
if ($YYEXTOPT_NOGX_Enable -ne "True") {
	Write-Host "[NOGX] The extension is disabled."
	exit 0
}

# Check if the current platform is Opera GX
Write-Host "[NOGX] Current platform: $YYPLATFORM_name"

$isOperaGxPlatform = $YYPLATFORM_name -ieq "Opera GX" -or $YYPLATFORM_name -ieq "operagx"
if (-not $isOperaGxPlatform) {
	Write-Host "[NOGX] Aborting: This script is only for Opera GX platform."
	exit 0
}

# Validate required environment variables
if ([string]::IsNullOrWhiteSpace($YYtargetFile)) {
	Write-Error "[NOGX] ERROR: YYtargetFile environment variable is not set."
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

# Define directory paths
$webfilesDir = [System.IO.Path]::Combine($PSScriptRoot, "..", "..", "webfiles")
$webfilesDir = [System.IO.Path]::GetFullPath($webfilesDir)

Write-Host "[NOGX] Project name: $YYprojectName"
Write-Host "[NOGX] Target runtime: $YYTARGET_runtime"
Write-Host "[NOGX] Target file: $YYtargetFile"
Write-Host "[NOGX] Webfiles dir: $webfilesDir"

# Validate that target file exists
if (-not (Test-Path -Path $YYtargetFile -PathType Leaf)) {
	Write-Error "[NOGX] ERROR: Target file not found: '$YYtargetFile'"
	exit 1
}

# Load required assemblies for ZIP file operations
Add-Type -AssemblyName System.IO.Compression -ErrorAction Stop
Add-Type -AssemblyName System.IO.Compression.FileSystem -ErrorAction Stop

<#
.SYNOPSIS
    Removes a file from a ZIP archive.
.DESCRIPTION
    Deletes an entry from the ZIP archive if it exists.
#>
function RemoveFile-Zip {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory)]
		[System.IO.Compression.ZipArchive]$Zip,
		
		[Parameter(Mandatory)]
		[string]$FileName
	)
	
	try {
		Write-Host "[NOGX] Remove '$FileName'"
		$entry = $Zip.GetEntry($FileName)
		if ($null -ne $entry) {
			$entry.Delete()
		}
	}
	catch {
		Write-Warning "[NOGX] Failed to remove file '$FileName' from ZIP: $_"
	}
}

<#
.SYNOPSIS
    Renames a file within a ZIP archive.
.DESCRIPTION
    Creates a new entry with the new name, copies content from the old entry, and deletes the old entry.
#>
function RenameFile-Zip {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory)]
		[System.IO.Compression.ZipArchive]$Zip,
		
		[Parameter(Mandatory)]
		[string]$OldName,
		
		[Parameter(Mandatory)]
		[string]$NewName
	)
	
	try {
		Write-Host "[NOGX] Rename '$OldName' -> '$NewName'"
		$entry = $Zip.GetEntry($OldName)
		if ($null -ne $entry) {
			# Read content from old entry
			$stream = $entry.Open()
			$memoryStream = New-Object System.IO.MemoryStream
			$stream.CopyTo($memoryStream)
			$stream.Close()
			$memoryStream.Position = 0
			
			# Create new entry with new name
			$newEntry = $Zip.CreateEntry($NewName)
			$newStream = $newEntry.Open()
			$memoryStream.CopyTo($newStream)
			$newStream.Close()
			$memoryStream.Dispose()
			
			# Delete old entry
			$entry.Delete()
		}
	}
	catch {
		Write-Error "[NOGX] Failed to rename file '$OldName' to '$NewName' in ZIP: $_"
		throw
	}
}

# Main execution block
$zip = $null
try {
	# Step 1: Open ZIP archive for modification
	Write-Host "[NOGX] Repackaging target file..."
	$zip = [System.IO.Compression.ZipFile]::Open($YYtargetFile, 'Update')

	# Step 2: Remove extra files from ZIP archive
	RemoveFile-Zip -Zip $zip -FileName "index.html"

	# Step 3: Process files based on runtime target
	if ($YYTARGET_runtime -ieq "YYC") {
		# YYC (YoYo Compiler) runtime: remove unnecessary files and rename JS file
		RemoveFile-Zip -Zip $zip -FileName "runner.html"
		RemoveFile-Zip -Zip $zip -FileName "runner.json"
		RemoveFile-Zip -Zip $zip -FileName "run.xml"
		RemoveFile-Zip -Zip $zip -FileName "runner-sw.js"
		RemoveFile-Zip -Zip $zip -FileName "$YYprojectName.html"
		RenameFile-Zip -Zip $zip -OldName "$YYprojectName.js" -NewName "runner.js"
	}
	elseif ($YYTARGET_runtime -ieq "VM") {
		# VM (Virtual Machine) runtime: remove runner.json
		RemoveFile-Zip -Zip $zip -FileName "runner.json"
	}
	else {
		$zip.Dispose()
		Write-Error "[NOGX] ERROR: Unknown runtime target '$YYTARGET_runtime'."
		Write-Error "[NOGX] Supported runtime targets: YYC, VM"
		exit 1
	}

	# Step 4: Fix "Ya" variable conflict if enabled
	if ($YYEXTOPT_NOGX_YaFix -eq "True") {
		Write-Host "[NOGX] Fixing Ya variable conflict."
		$entryPath = "runner.js"
		$entry = $zip.GetEntry($entryPath)
		
		if ($null -ne $entry) {
			$encoding = [System.Text.Encoding]::UTF8
			
			# Read content from runner.js
			$stream = $entry.Open()
			$reader = New-Object System.IO.StreamReader($stream, $encoding)
			$content = $reader.ReadToEnd()
			$reader.Dispose()
			$stream.Dispose()
			$entry.Delete()
			
			# Apply replacements to fix Ya variable conflict:
			# 1. Replace "Ya" -> "Yv" globally
			# 2. Replace WebAssembly.instantiate(d,b) with wrapper that sets Ya=Yv
			# 3. Replace WebAssembly.instantiateStreaming patterns with wrappers
			$updatedContent = $content.Replace("Ya", "Yv").Replace(
					"WebAssembly.instantiate(d,b)",
					"{b.a.Ya=b.a.Yv;return WebAssembly.instantiate(d,b);}"
				).Replace(
					'(d=>WebAssembly.instantiateStreaming(d,a).then(b,function(e){l(`wasm streaming compile failed: `);l("falling back to ArrayBuffer instantiation");return Lb(c,a,b)}))',
					'(d=>{a.a.Ya=a.a.Yv;return WebAssembly.instantiateStreaming(d,a).then(b,function(e){l(`wasm streaming compile failed: `);l("falling back to ArrayBuffer instantiation");return Lb(c,a,b)})})'
				).Replace(
					'(d=>WebAssembly.instantiateStreaming(d,a).then(b,function(e){l(`wasm streaming compile failed: `);l("falling back to ArrayBuffer instantiation");return Mb(c,a,b)}))',
					'(d=>{a.a.Ya=a.a.Yv;return WebAssembly.instantiateStreaming(d,a).then(b,function(e){l(`wasm streaming compile failed: `);l("falling back to ArrayBuffer instantiation");return Mb(c,a,b)})})'
				)
			
			# Write updated content to temporary file and add to ZIP
			$tempFile = [System.IO.Path]::GetTempFileName()
			try {
				[System.IO.File]::WriteAllText($tempFile, $updatedContent, $encoding)
				[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $tempFile, (Split-Path $entryPath -Leaf)) | Out-Null
			}
			catch {
				Write-Error "[NOGX] ERROR: Failed to update runner.js with Ya fix: $_"
				throw
			}
			finally {
				if (Test-Path -Path $tempFile) {
					Remove-Item -Path $tempFile -Force -ErrorAction SilentlyContinue
				}
			}
		}
		else {
			Write-Warning "[NOGX] runner.js not found in ZIP archive. Skipping Ya fix."
		}
	}

	# Step 5: Add files from 'webfiles' folder if it exists
	if (Test-Path -Path $webfilesDir -PathType Container) {
		Write-Host "[NOGX] Adding 'webfiles' folder content."
		Push-Location -Path $webfilesDir
		try {
			$files = Get-ChildItem -Recurse -File -ErrorAction Stop
			
			foreach ($file in $files) {
				# Calculate relative path and normalize to forward slashes
				$relativePath = Resolve-Path -Path $file.FullName -Relative
				$relativePath = $relativePath.Substring(2).Replace('\', '/')
				
				# Remove existing entry if it exists
				$entry = $zip.GetEntry($relativePath)
				if ($null -ne $entry) {
					$entry.Delete()
				}
				
				# Add file to ZIP archive
				Write-Host "[NOGX] Adding '$relativePath'"
				[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, $relativePath) | Out-Null
			}
		}
		catch {
			Write-Error "[NOGX] ERROR: Failed to add webfiles folder content: $_"
			throw
		}
		finally {
			Pop-Location
		}
	}
	else {
		Write-Host "[NOGX] 'webfiles' folder does not exist. Skipping."
	}

	# Step 6: Add prepared 'index.html' file
	$sourceFile = [System.IO.Path]::Combine($YYtempFolder, "NOGX_index.html")
	if (-not (Test-Path -Path $sourceFile -PathType Leaf)) {
		$zip.Dispose()
		Write-Error "[NOGX] ERROR: Processed index.html file does not exist: '$sourceFile'"
		Write-Error "[NOGX] Make sure pre_build_step.ps1 completed successfully."
		exit 1
	}
	
	# Remove existing index.html and add the processed one
	RemoveFile-Zip -Zip $zip -FileName "index.html"
	Write-Host "[NOGX] Add processed 'index.html'"
	[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $sourceFile, "index.html") | Out-Null

	# Step 7: Close and save ZIP archive
	$zip.Dispose()

	Write-Host "[NOGX] Repackaging complete!"
	exit 0
}
catch {
	# Ensure ZIP archive is disposed even on error
	if ($null -ne $zip) {
		try {
			$zip.Dispose()
		}
		catch {
			# Ignore disposal errors
		}
	}
	
	Write-Error "[NOGX] FATAL ERROR: $_"
	Write-Error "[NOGX] Stack trace: $($_.ScriptStackTrace)"
	exit 1
}

