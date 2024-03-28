<?php

// Set the path to the directory containing the files you want to serve
$filePath = __DIR__ . '/style';

// Parse the incoming Git request
$request = file_get_contents('php://input');

// Extract the Git command from the request
$gitCommand = trim($request);

// Set the content type as 'application/x-git-upload-pack-result'
header('Content-Type: application/x-git-upload-pack-result');

// Transmit the response
transmitResponse($filePath);

// Function to transmit the response
function transmitResponse($filePath) {
    // Send the service response header
    echo "001e# service=git-upload-pack\n";

    // Separate the service header from the repository data with a null byte
    echo "0000";

    // Transmit the "info/refs" file first
    transmitFile($filePath . '/info/refs');

    // Transmit all files in the "objects" directory
    transmitFiles($filePath . '/objects');
}

// Function to transmit a file
function transmitFile($file) {
    // Output the length of the file in hexadecimal
    echo sprintf("%04x", filesize($file) + 4);
    echo 'text=';
    // Output the content of the file
    readfile($file);
}

// Function to transmit all files in a directory recursively
function transmitFiles($directory) {
    // Open the directory
    if ($handle = opendir($directory)) {
        // Loop through each file in the directory
        while (false !== ($file = readdir($handle))) {
            if ($file !== '.' && $file !== '..') {
                // Transmit file content
                transmitFile($directory . '/' . $file);
            }
        }
        // Close the directory handle
        closedir($handle);
    }
}

?>