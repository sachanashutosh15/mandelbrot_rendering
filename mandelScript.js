import { createMandelBrotGrid } from "./mandelbrotSet.js";

let zoomEnabled = false;
let processing = false;
let length = 4;
let cx = 0;
let cy = 0;
let grid = [];
let delta = length / 720;
const verticalMovement = 50 / 720;
const horizontalMovement = 50 / 720;


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvasfilm');
  renderMandelbrotGrid(cx, cy, length);
  canvas.addEventListener('keydown', (e) => {
    if (e.code == 'KeyS') {
      if (!processing) {
        console.log('!processing');
        scrollDown();
      }
    }
    if (e.code == 'KeyW') {
      if (!processing) {
        console.log('!processing');
        scrollUp();
      }
    }
    if (e.code == 'KeyD') {
      if (!processing) {
        console.log('!processing');
        scrollRight();
      }
    }
    if (e.code == 'KeyA') {
      if (!processing) {
        console.log('!processing');
        scrollLeft();
      }
    }
  })
})

export function coordinate(event) {
  const target = event.target;
  const rect = target.getBoundingClientRect();
  const xLocation = Math.floor(event.clientX - rect.left);
  const yLocation = Math.floor(event.clientY - rect.top);
  if (zoomEnabled) {
    const canvas = document.getElementById('canvasfilm');
    const ctx = canvas.getContext('2d');
    let axiLoc = xLocation - 180;
    let ayiLoc = yLocation - 180;
    ctx.clearRect(0, 0, 721, 721);
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.rect(axiLoc, ayiLoc, 360, 360);
    ctx.stroke()
  }
}

export function toggleEnableZoom() {
  if (!processing) {
    zoomEnabled = !zoomEnabled;
    const canvas = document.getElementById('canvasfilm');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 721, 721);
  } else {
    window.alert('still processing');
  }
}

export function zoomIn(event) {
  if (processing || !zoomEnabled) {
    return;
  }
  toggleEnableZoom();
  processing = true;
  console.log('>>>zooming in');
  const target = event.target;
  const rect = target.getBoundingClientRect();
  const xLocation = Math.floor(event.clientX - rect.left);
  const yLocation = Math.floor(event.clientY - rect.top);
  cx += roundOffToDigits(((xLocation - 360) / 720) * length, 6);
  cy += roundOffToDigits(((yLocation - 360) / 720) * length, 6);
  length = length / 2;
  delta = length / 720;
  renderMandelbrotGrid(cx, cy, length);
  processing = false;
  zoomEnabled = false;
}

function renderMandelbrotGrid(cx, cy, length) {
  console.log('>>>rendering for:', cx, cy, length);
  const axi = roundOffToDigits(cx - (length / 2), 6);
  const ayi = roundOffToDigits(cy - (length / 2), 6);
  const axf = roundOffToDigits(cx + (length / 2), 6);
  const ayf = roundOffToDigits(cy + (length / 2), 6);
  const loadedElement = document.getElementById('loaded');
  grid = createMandelBrotGrid(axi, axf, ayi, ayf, delta, loadedElement);
  renderGrid(grid);
}

function renderGrid(grid) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 721, 721);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      ctx.fillStyle = `#${grid[i][j]}`;
      ctx.fillRect(j, i, 1, 1);
    }
  }
}

function roundOffToDigits(num, digits = 2) {
  const constant = 10 ** digits;
  return Math.floor(num * constant) / constant;
}

function scrollUp() {
  if (processing) {
    return;
  }
  processing = true;
  const axi = roundOffToDigits(cx - (length / 2), 6);
  const axf = roundOffToDigits(cx + (length / 2), 6);
  const ayf = roundOffToDigits(cy - (length / 2), 6);
  const ayi = ayf - verticalMovement;
  const loadedElement = document.getElementById('loaded');
  const newPixels = createMandelBrotGrid(axi, axf, ayi, ayf, delta, loadedElement);
  console.log('newPixels', newPixels);
  cy -= verticalMovement;
  grid = [...newPixels, ...grid.slice(0, grid.length - newPixels.length + 1)];
  renderGrid(grid);
  processing = false;
}

function scrollDown() {
  if (processing) {
    return;
  }
  processing = true;
  const axi = roundOffToDigits(cx - (length / 2), 6);
  const ayi = roundOffToDigits(cy + (length / 2), 6);
  const axf = roundOffToDigits(cx + (length / 2), 6);
  const ayf = ayi + verticalMovement;
  const loadedElement = document.getElementById('loaded');
  const newPixels = createMandelBrotGrid(axi, axf, ayi, ayf, delta, loadedElement);
  console.log('newPixels', newPixels);
  cy += verticalMovement;
  grid = [...grid.slice(newPixels.length), ...newPixels];
  renderGrid(grid);
  processing = false;
}

function scrollRight() {
  if (processing) {
    return;
  }
  processing = true;
  const axi = roundOffToDigits(cx + (length / 2), 6);
  const axf = axi + horizontalMovement;
  const ayi = roundOffToDigits(cy - (length / 2), 6);
  const ayf = roundOffToDigits(cy + (length / 2), 6);
  const loadedElement = document.getElementById('loaded');
  const newPixels = createMandelBrotGrid(axi, axf, ayi, ayf, delta, loadedElement);
  console.log('newPixels', newPixels);
  cx += horizontalMovement;
  for (let i = 0; i < grid.length; i++) {
    if (newPixels[i]) {
      grid[i] = [...grid[i].slice(newPixels[i].length), ...newPixels[i]];
    }
  }
  renderGrid(grid);
  processing = false;
}

function scrollLeft() {
  if (processing) {
    return;
  }
  processing = true;
  const axf = roundOffToDigits(cx - (length / 2), 6);
  const axi = axf - horizontalMovement;
  const ayi = roundOffToDigits(cy - (length / 2), 6);
  const ayf = roundOffToDigits(cy + (length / 2), 6);
  const loadedElement = document.getElementById('loaded');
  const newPixels = createMandelBrotGrid(axi, axf, ayi, ayf, delta, loadedElement);
  console.log('newPixels', newPixels);
  cx -= horizontalMovement;
  for (let i = 0; i < grid.length; i++) {
    if (newPixels[i]) {
      grid[i] = [...newPixels[i], ...grid[i].slice(0, grid[i].length - newPixels[i].length + 1)];
    }
  }
  renderGrid(grid);
  processing = false;
}

function loadedElementTest() {
  let val = 0;
  const intervalId = setInterval(() => {
    val++;
    const loadedElement = document.getElementById('loaded');
    loadedElement.innerHTML = `${val} %`;
    loadedElement.style.width = `${val}%`;
    if (val >= 100) {
      clearInterval(intervalId);
    }
  }, 100);
}