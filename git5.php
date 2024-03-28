<?php

// Set the path to the directory containing the files you want to serve
$filePath = 'style/';

// Parse the incoming Git request
$request = file_get_contents('php://input');

// Extract the Git command from the request
$gitCommand = trim($request);

// Validate the command
// Set the content type as 'application/x-git-upload-pack-result'
header('Content-Type: application/x-git-upload-pack-result');

// Set the service response header
echo "001e# service=git-upload-pack\n";

// Separate the service header from the repository data with a null byte
echo "0000";

// Execute the Git command (in this case, serving the files)
chdir($filePath);
$output = shell_exec('git update-server-info 2>&1 && git-upload-pack . 2>&1');

// Output the Git command response
echo $output;

?>