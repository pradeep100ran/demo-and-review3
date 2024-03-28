<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stock Price Odometer</title>
  <style>
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      font-family: 'Arial', sans-serif;
    }

    .odometer {
      font-size: 2em;
      font-weight: bold;
      overflow: hidden;
      white-space: nowrap;
    }

    .rolling-digit {
      display: inline-block;
      transition: transform 0.3s ease-in-out;
    }
  </style>
</head>
<body>
  <div id="odometer" class="odometer">
    <span class="rolling-digit">0</span>
    <span class="rolling-digit">0</span>
    <span class="rolling-digit">.</span>
    <span class="rolling-digit">0</span>
    <span class="rolling-digit">0</span>
  </div>

  <script>
    // Simulating stock price updates
    function simulateStockPriceUpdate() {
      return (Math.random() * (1000 - 500) + 500).toFixed(2);
    }

    // Update odometer with new stock price
    function updateOdometer() {
      const odometerElement = document.getElementById('odometer');
      const currentPrice = parseFloat(odometerElement.innerText);
      const newPrice = simulateStockPriceUpdate();
      const digits = newPrice.split('');

      digits.forEach((digit, index) => {
        const digitElement = document.createElement('span');
        digitElement.classList.add('rolling-digit');
        digitElement.innerText = digit;

        // Apply transform to move the digit up
        digitElement.style.transform = `translateY(-${index * 100}%)`;
        
        odometerElement.appendChild(digitElement);
      });

      // Remove previous digits after the animation
      setTimeout(() => {
        while (odometerElement.firstChild) {
          odometerElement.removeChild(odometerElement.firstChild);
        }
        odometerElement.innerText = newPrice;
      }, 300);
    }

    // Simulate stock price update every 5 seconds
    setInterval(updateOdometer, 5000);

    // Initial update
    updateOdometer();
  </script>
</body>
</html>