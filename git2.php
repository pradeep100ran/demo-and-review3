<?php

// Set the path to your Git repositories
$repositoriesPath = 'index.php';

// Parse the incoming Git request
$request = file_get_contents('php://input');

// Extract the Git command and repository from the request
list($gitCommand, $repository) = explode(' ', $request);

// Build the path to the requested repository
$repositoryPath = $repositoriesPath . '/' . $repository;

// Check if the requested repository exists
if (!is_dir($repositoryPath)) {
    http_response_code(404);
    exit('Repository not found');
}

// Execute the Git command
chdir($repositoryPath);
$output = shell_exec('git ' . trim($gitCommand));

// Output the Git command response
echo $output;

?>