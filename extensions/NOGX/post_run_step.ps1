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

$isOperaGxPlatform = $YYPLATFORM_name -ieq "Opera GX" -or $YYPLATFORM_name -ieq "operagx"
if (-not $isOperaGxPlatform) {
	Write-Host "[NOGX] Aborting: This script is only for Opera GX platform."
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

# Main execution block
try {
	# Step 1: Define directory paths
	$outputDir = [System.IO.Path]::Combine($YYoutputFolder, "runner")
	$webfilesDir = [System.IO.Path]::Combine($PSScriptRoot, "..", "..", "webfiles")
	$webfilesDir = [System.IO.Path]::GetFullPath($webfilesDir)

	Write-Host "[NOGX] Project name: $YYprojectName"
	Write-Host "[NOGX] Target runtime: $YYTARGET_runtime"
	Write-Host "[NOGX] Output dir: $outputDir"
	Write-Host "[NOGX] Webfiles dir: $webfilesDir"

	# Step 2: Validate that output directory exists
	if (-not (Test-Path -Path $outputDir -PathType Container)) {
		Write-Error "[NOGX] ERROR: Output directory does not exist: '$outputDir'"
		exit 1
	}

	# Step 3: Copy webfiles folder content if it exists
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

	# Step 4: Validate that the processed index.html file exists
	$sourceFile = [System.IO.Path]::Combine($YYtempFolder, "NOGX_index.html")
	if (-not (Test-Path -Path $sourceFile -PathType Leaf)) {
		Write-Error "[NOGX] ERROR: Processed index.html file does not exist: '$sourceFile'"
		Write-Error "[NOGX] Make sure pre_build_step.ps1 completed successfully."
		exit 1
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

	Write-Host "[NOGX] Done."
	exit 0
}
catch {
	Write-Error "[NOGX] FATAL ERROR: $_"
	Write-Error "[NOGX] Stack trace: $($_.ScriptStackTrace)"
	exit 1
}

