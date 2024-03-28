<?php

// Set the path to the directory containing the files you want to serve
$filePath = __DIR__ . '/style';

// Parse the incoming Git request
$request = file_get_contents('php://input');

// Extract the Git command from the request
$gitCommand = trim($request);
// Set the content type as 'application/x-git-upload-pack-result'
header('Content-Type: application/x-git-upload-pack-result');

// Set the service response header
echo "001e# service=git-upload-pack\n";

// Separate the service header from the repository data with a null byte
echo "0000";

// Transmit all files in the "style" directory
transmitFiles($filePath);

// Function to transmit all files in a directory recursively
function transmitFiles($directory) {
    // Open the directory
    if ($handle = opendir($directory)) {
        // Loop through each file in the directory
        while (false !== ($file = readdir($handle))) {
            if ($file !== '.' && $file !== '..') {
                // Transmit file content
                echo file_get_contents($directory . '/' . $file);
            }
        }
        // Close the directory handle
        closedir($handle);
    }
}

?>