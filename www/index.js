import { Universe } from "wasm-game-of-life";
// Import the WebAssembly memory
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

import FramesGraph from "./src/fps";

const documentStyle = getComputedStyle(document.documentElement);

const colors = {
  success: documentStyle.getPropertyValue("--success"),
  warning: documentStyle.getPropertyValue("--warning"),
  monochrome100: documentStyle.getPropertyValue("--monochrome-100"),
  monochrome700: documentStyle.getPropertyValue("--monochrome-700"),
  monochrome900: documentStyle.getPropertyValue("--monochrome-900"),
  white: documentStyle.getPropertyValue("--white"),
};

// Settings
const CELL_SIZE = 8;
const GRID_COLOR = colors.monochrome700;
const DEAD_COLOR = colors.monochrome900;
const ALIVE_COLOR = colors.white;

const width = 64;
const height = 64;

let fps = 30;
let animationId = null;
let previousDelta = 0;
let isGridShown = true;
let isControlPressed = false;
let isShiftPressed = false;
let isFpsShown = false;

// Utils
const toggleGrid = () => {
  if (isGridShown) {
    gridButton.textContent = "Show Grid";
    clearGrid();
    isGridShown = false;
  } else {
    gridButton.textContent = "Hide Grid";
    drawGrid();
    isGridShown = true;
  }
};

const toggleFps = () => {
  if (isFpsShown) {
    fpsButton.textContent = "Show FPS";
    fpsCounter.style.display = "none";
    isFpsShown = false;
  } else {
    framesGraph.render();
    fpsButton.textContent = "Hide FPS";
    fpsCounter.style.display = "block";
    isFpsShown = true;
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

const clearBoard = () => {
  pause();
  universe.clear();
  drawCells();
};

const saveBoard = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, (width * height) / 8);
  pause();
  localStorage.setItem("save", JSON.stringify(cells));
  loadButton.disabled = false;
};

const loadBoard = () => {
  const cellsPtr = universe.cells();
  const cells = JSON.parse(localStorage.getItem("save"));
  Object.keys(cells).forEach((cell) => {
    new Uint8Array(memory.buffer, cellsPtr, (width * height) / 8)[cell] =
      cells[cell];
  });
  pause();
  drawCells(cells);
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

const fpsCounter = document.getElementById("fps-counter");

// Controls
const playButton = document.getElementById("btn-play");
const stepButton = document.getElementById("btn-step");
const randomButton = document.getElementById("btn-random");
const clearButton = document.getElementById("btn-clear");
const gridButton = document.getElementById("btn-grid");
const fpsButton = document.getElementById("btn-fps");
const fpsInput = document.getElementById("input-fps");
const saveButton = document.getElementById("btn-save");
const loadButton = document.getElementById("btn-load");

playButton.addEventListener("click", togglePlay);
stepButton.addEventListener("click", stepForward);

randomButton.addEventListener("click", (_) => {
  pause();
  universe.set_random();
  drawCells();
});

gridButton.addEventListener("click", toggleGrid);
clearButton.addEventListener("click", clearBoard);
saveButton.addEventListener("click", saveBoard);
loadButton.addEventListener("click", loadBoard);
fpsButton.addEventListener("click", toggleFps);

fpsInput.addEventListener("change", (event) => {
  fps = event.target.value;
});

// Construct the universe
let universe = Universe.new(width, height);

// Give the canvas room for all of our cells and a 1px border
// around each of them.
const canvas = document.getElementById("canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;
const ctx = canvas.getContext("2d");

const framesGraph = new FramesGraph(fpsCounter);

const renderLoop = (currentDelta) => {
  if (isFpsShown) {
    framesGraph.render();
  }

  animationId = requestAnimationFrame(renderLoop);

  const delta = currentDelta - previousDelta;
  if (delta < 1000 / fps) return;

  universe.tick();

  drawCells();

  previousDelta = currentDelta;
};

const drawGrid = () => {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  // Vertical lines.
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 0.5, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 0.5, (CELL_SIZE + 1) * height + 1);
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 0.5);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 0.5);
  }

  ctx.stroke();
};

const clearGrid = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCells();
};

const getIndex = (row, column) => {
  return row * width + column;
};

const bitIsSet = (n, arr) => {
  const byte = Math.floor(n / 8);
  const mask = 1 << n % 8;
  return (arr[byte] & mask) === mask;
};

const drawCells = (savedCells) => {
  const cellsPtr = universe.cells();
  const cells = savedCells
    ? savedCells
    : new Uint8Array(memory.buffer, cellsPtr, (width * height) / 8);

  ctx.beginPath();

  // Alive cells.
  ctx.fillStyle = ALIVE_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);
      if (!bitIsSet(idx, cells)) {
        continue;
      }

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  // Dead cells.
  ctx.fillStyle = DEAD_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);
      if (bitIsSet(idx, cells)) {
        continue;
      }

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
  if (event.code === "Space") {
    event.preventDefault();
    // reset focus
    if (document.activeElement != document.body) document.activeElement.blur();
    togglePlay();
  }

  if (event.key === "ArrowRight") {
    stepForward();
  }

  if (event.key === "c" && !isControlPressed) {
    clearBoard();
  }

  if (event.key === "s" && !isControlPressed) {
    saveBoard();
  }

  if (event.key === "r" && !isControlPressed) {
    loadBoard();
  }

  if (event.key === "Control") {
    isControlPressed = true;
  }

  if (event.key === "Shift") {
    isShiftPressed = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Control") {
    isControlPressed = false;
  }

  if (event.key === "Shift") {
    isShiftPressed = false;
  }
});

if (localStorage.getItem("save")) {
  loadButton.disabled = false;
}

// initial render
const start = () => {
  universe.add_glider(5, 5);
  universe.add_pulsar(40, 40);
  drawGrid();
  drawCells();
};

start();
