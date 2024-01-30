let currentIndex = 0;
let totalItems = 0;

function showItem(index) {
  const container = document.querySelector('.carousel-container');
  const items = document.querySelectorAll('.carousel-item');
  const itemWidth = items[0].offsetWidth; // Assuming all items have the same width
  container.style.transition = 'transform 0.5s ease-in-out';
  container.style.transform = `translateX(${-index * itemWidth}px)`;

  // Update dot indicators
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
}

function nextItem() {
  currentIndex = (currentIndex + 1) % totalItems;
  showItem(currentIndex);
}

function prevItem() {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  showItem(currentIndex);
}

setInterval(nextItem, 3000);

function evaluateExpression(expression, i) {
  try {
    const compiledExpression = math.compile(expression);
    return compiledExpression.evaluate({ i: i });
  } catch (error) {
    console.error("Error evaluating expression:", error);
    return 0; // Return 0 for simplicity in case of an error
  }
}

function calculate() {
  const expression = document.getElementById('expression').value;
  const start = parseInt(document.getElementById('start').value);
  const end = parseInt(document.getElementById('end').value);

  let result = 0;
  let sigmaNotation = '';

  for (let i = start; i <= end; i++) {
    const term = evaluateExpression(expression, i);
    result += term;

    // Build sigma notation
    sigmaNotation += (i === start) ? `${term}` : ` + ${term}`;
  }

  // Display result and sigma notation
  document.getElementById('result').innerText = `= ${result}`;
  document.getElementById('sigmaNotation').innerText = `= ${sigmaNotation}`;
}

// Add dot indicators dynamically based on the number of items
const dotContainer = document.querySelector('.dot-indicators');
const items = document.querySelectorAll('.carousel-item');
totalItems = items.length;

for (let i = 0; i < totalItems; i++) {
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.addEventListener('click', () => showItem(i));
  dotContainer.appendChild(dot);
}

function showCalculator() {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('calculatorContainer').style.display = 'block';
}

// Function to hide the calculator
function hideCalculator() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('calculatorContainer').style.display = 'none';
}

document.querySelector('.calcubtn').addEventListener('click', showCalculator);
document.getElementById('overlay').addEventListener('click', hideCalculator);
