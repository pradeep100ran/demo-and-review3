<?php

// Set the path to the directory containing the files you want to serve
$filePath = 'apis';

// Parse the incoming Git request
$request = file_get_contents('php://input');

// Extract the Git command from the request
$gitCommand = trim($request);
header('Content-Type: application/x-git-upload-pack-result');

// Execute the Git command (in this case, just listing files)
$output = shell_exec('git --git-dir=' . escapeshellarg($filePath) . ' upload-pack --stateless-rpc .');

// Output the Git command response
echo $output;

?>