<?php

// Set the path to your Git repository
$repositoryPath = 'apis/repository';

// Parse the incoming Git request
$request = file_get_contents('php://input');

// Extract the Git command and repository from the request
list($gitCommand, $repository) = explode(' ', $request);

// Validate the command
if ($gitCommand !== 'git-upload-pack') {
    http_response_code(400);
    exit('Unsupported command');
}

// Build the path to the requested repository
$repositoryPath .= '/' . $repository . '.git';

// Check if the requested repository exists
if (!is_dir($repositoryPath)) {
    http_response_code(404);
    exit('Repository not found');
}

// Set the content type as 'application/x-git-upload-pack-result'
header('Content-Type: application/x-git-upload-pack-result');

// Execute the Git command
chdir($repositoryPath);
$output = shell_exec('git-upload-pack --stateless-rpc .');

// Output the Git command response
echo $output;

?>