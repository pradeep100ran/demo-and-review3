<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    #sliderContainer {
      width: 300px;
      margin: 50px auto;
    }

    #slider {
      width: 100%;
      height: 20px;
      background-color: #ddd;
      position: relative;
    }

    #filledPart {
      height: 100%;
      background-color: #4CAF50;
      position: absolute;
      top: 0;
      left: 0;
    }
  </style>
</head>
<body>

<div id="sliderContainer">
  <div id="slider">
    <div id="filledPart"></div>
  </div>
</div>

<script>
  const slider = document.getElementById('slider');
  const filledPart = document.getElementById('filledPart');

  let value = 0;

  setInterval(() => {
    value = (value + 1) % 101; // Increment value (0 to 100)
    updateSlider();
  }, 1000);

  function updateSlider() {
    const filledWidth = (value / 100) * slider.offsetWidth;
    filledPart.style.width = `${filledWidth}px`;
  }
</script>

</body>
</html>