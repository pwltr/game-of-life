import { Universe, Cell } from "wasm-game-of-life";
// Import the WebAssembly memory
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

const documentStyle = getComputedStyle(document.documentElement);

const colors = {
  success: documentStyle.getPropertyValue("--success"),
  warning: documentStyle.getPropertyValue("--warning"),
  monochrome900: documentStyle.getPropertyValue("--monochrome-900"),
};

const CELL_SIZE = 8;
const GRID_COLOR = "#999999";
const DEAD_COLOR = "#000000";
const ALIVE_COLOR = "#FFFFFF";

// Settings
let width = 64;
let height = 64;
let fps = 30;
let animationId = null;
let previousDelta = 0;
let isGridShown = true;
let isControlPressed = false;
let isShiftPressed = false;

// Helpers
const toggleGrid = () => {
  if (isGridShown) {
    gridButton.textContent = "Show Grid";
    drawGrid(colors["monochrome900"]);
    isGridShown = false;
  } else {
    gridButton.textContent = "Hide Grid";
    drawGrid();
    isGridShown = true;
  }
};

const togglePlay = () => {
  if (isPaused()) {
    play();
  } else {
    pause();
  }
};

const stepForward = () => {
  pause();
  universe.tick();
  drawCells();
};

const isPaused = () => {
  return animationId === null;
};

const play = () => {
  playButton.textContent = "⏸ Pause";
  playButton.style.background = colors["warning"];
  renderLoop();
};

const pause = () => {
  playButton.textContent = "▶ Run";
  playButton.style.background = colors["success"];
  cancelAnimationFrame(animationId);
  animationId = null;
};

// Controls
const playButton = document.getElementById("btn-play");
const stepButton = document.getElementById("btn-step");
const randomButton = document.getElementById("btn-random");
const clearButton = document.getElementById("btn-clear");
const gridButton = document.getElementById("btn-grid");
const fpsInput = document.getElementById("input-fps");

playButton.addEventListener("click", togglePlay);
stepButton.addEventListener("click", stepForward);

randomButton.addEventListener("click", (_) => {
  pause();
  universe.set_random();
  drawCells();
});

clearButton.addEventListener("click", (_) => {
  pause();
  universe.clear();
  drawCells();
});

gridButton.addEventListener("click", (_) => {
  toggleGrid();
});

fpsInput.addEventListener("change", (event) => {
  fps = event.target.value;
});

// Construct the universe, and get its width and height.
let universe = Universe.new(width, height);

// Give the canvas room for all of our cells and a 1px border
// around each of them.
const canvas = document.getElementById("canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext("2d");

const renderLoop = (currentDelta) => {
  fpsCounter.render();

  // debugger;
  animationId = requestAnimationFrame(renderLoop);

  const delta = currentDelta - previousDelta;
  if (delta < 1000 / fps) return;

  universe.tick();

  drawCells();

  previousDelta = currentDelta;
};

const drawGrid = (color = GRID_COLOR) => {
  ctx.beginPath();
  ctx.strokeStyle = color;

  // Vertical lines.
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
};

const getIndex = (row, column) => {
  return row * width + column;
};

const bitIsSet = (n, arr) => {
  const byte = Math.floor(n / 8);
  const mask = 1 << n % 8;
  return (arr[byte] & mask) === mask;
};

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, (width * height) / 8);

  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);

      ctx.fillStyle = bitIsSet(idx, cells) ? ALIVE_COLOR : DEAD_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
};

// Drawing cell patterns
canvas.addEventListener("click", (event) => {
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  if (isControlPressed) {
    universe.add_glider(row, col);
  } else if (isShiftPressed) {
    universe.add_pulsar(row, col);
  } else {
    universe.toggle_cell(row, col);
  }

  drawCells();
});

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  // console.log(event);

  if (event.code === "Space") {
    togglePlay();
  }

  if (event.key === "ArrowRight") {
    stepForward();
  }

  if (event.key === "Control") {
    isControlPressed = true;
  }

  if (event.key === "Shift") {
    isShiftPressed = true;
  }
});

document.addEventListener("keyup", (event) => {
  console.log(event);

  if (event.key === "Control") {
    isControlPressed = false;
  }

  if (event.key === "Shift") {
    isShiftPressed = false;
  }
});

// initial render
universe.add_glider(5, 5);
universe.add_pulsar(40, 40);
drawGrid();
drawCells();

const fpsCounter = new (class {
  constructor() {
    this.fps = document.getElementById("fps-counter");
    this.frames = [];
    this.lastFrameTimeStamp = performance.now();
  }

  render() {
    // Convert the delta time since the last frame render into a measure
    // of frames per second.
    const now = performance.now();
    const delta = now - this.lastFrameTimeStamp;
    this.lastFrameTimeStamp = now;
    const fps = (1 / delta) * 1000;

    // Save only the latest 100 timings.
    this.frames.push(fps);
    if (this.frames.length > 100) {
      this.frames.shift();
    }

    // Find the max, min, and mean of our 100 latest timings.
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (let i = 0; i < this.frames.length; i++) {
      sum += this.frames[i];
      min = Math.min(this.frames[i], min);
      max = Math.max(this.frames[i], max);
    }
    let mean = sum / this.frames.length;

    // Render the statistics.
    this.fps.textContent = `
Frames per Second:
         latest = ${Math.round(fps)}
avg of last 100 = ${Math.round(mean)}
min of last 100 = ${Math.round(min)}
max of last 100 = ${Math.round(max)}
`.trim();
  }
})();
