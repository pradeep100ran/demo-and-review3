<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text-to-Speech Example</title>
</head>
<body>

<h1>Text-to-Speech Example</h1>

<label for="textInput">Enter text to speak:</label>
<input type="text" id="textInput">
<button onclick="speakText()">Speak</button>

<script>
    function speakText() {
        const inputText = document.getElementById('textInput').value;
        if (inputText.trim() !== '') {
            const utterance = new SpeechSynthesisUtterance(inputText);
            window.speechSynthesis.speak(utterance);
        }
    }
</script>

</body>
</html>