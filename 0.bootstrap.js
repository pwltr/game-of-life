(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/wasm_game_of_life.js":
/*!***********************************!*\
  !*** ../pkg/wasm_game_of_life.js ***!
  \***********************************/
/*! exports provided: Universe, __wbg_new_693216e109162396, __wbg_stack_0ddaca5d1abfb52f, __wbg_error_09919627ac0992f5, __wbindgen_object_drop_ref, __wbg_random_7b8246250fd79f60, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_game_of_life_bg.wasm */ \"../pkg/wasm_game_of_life_bg.wasm\");\n/* harmony import */ var _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wasm_game_of_life_bg.js */ \"../pkg/wasm_game_of_life_bg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Universe\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Universe\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_new_693216e109162396\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_new_693216e109162396\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_stack_0ddaca5d1abfb52f\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_stack_0ddaca5d1abfb52f\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_error_09919627ac0992f5\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_error_09919627ac0992f5\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_object_drop_ref\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_random_7b8246250fd79f60\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_random_7b8246250fd79f60\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_throw\"]; });\n\n\n\n\n//# sourceURL=webpack:///../pkg/wasm_game_of_life.js?");

/***/ }),

/***/ "../pkg/wasm_game_of_life_bg.js":
/*!**************************************!*\
  !*** ../pkg/wasm_game_of_life_bg.js ***!
  \**************************************/
/*! exports provided: Universe, __wbg_new_693216e109162396, __wbg_stack_0ddaca5d1abfb52f, __wbg_error_09919627ac0992f5, __wbindgen_object_drop_ref, __wbg_random_7b8246250fd79f60, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Universe\", function() { return Universe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_new_693216e109162396\", function() { return __wbg_new_693216e109162396; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_stack_0ddaca5d1abfb52f\", function() { return __wbg_stack_0ddaca5d1abfb52f; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_error_09919627ac0992f5\", function() { return __wbg_error_09919627ac0992f5; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return __wbindgen_object_drop_ref; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_random_7b8246250fd79f60\", function() { return __wbg_random_7b8246250fd79f60; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_game_of_life_bg.wasm */ \"../pkg/wasm_game_of_life_bg.wasm\");\n\n\nconst heap = new Array(32).fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nfunction getObject(idx) { return heap[idx]; }\n\nlet heap_next = heap.length;\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction takeObject(idx) {\n    const ret = getObject(idx);\n    dropObject(idx);\n    return ret;\n}\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nconst lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;\n\nlet cachedTextEncoder = new lTextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length);\n        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len);\n\n    const mem = getUint8Memory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3);\n        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n\nlet cachegetInt32Memory0 = null;\nfunction getInt32Memory0() {\n    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetInt32Memory0 = new Int32Array(_wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetInt32Memory0;\n}\n\nfunction notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }\n/**\n*/\nclass Universe {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Universe.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_universe_free\"](ptr);\n    }\n    /**\n    * @param {number} width\n    * @param {number} height\n    * @returns {Universe}\n    */\n    static new(width, height) {\n        var ret = _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_new\"](width, height);\n        return Universe.__wrap(ret);\n    }\n    /**\n    * @returns {number}\n    */\n    width() {\n        var ret = _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_width\"](this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    height() {\n        var ret = _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_height\"](this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    cells() {\n        var ret = _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_cells\"](this.ptr);\n        return ret;\n    }\n    /**\n    */\n    tick() {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_tick\"](this.ptr);\n    }\n    /**\n    * @param {number} row\n    * @param {number} column\n    */\n    toggle_cell(row, column) {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_toggle_cell\"](this.ptr, row, column);\n    }\n    /**\n    * @param {number} row\n    * @param {number} column\n    */\n    add_glider(row, column) {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_add_glider\"](this.ptr, row, column);\n    }\n    /**\n    * @param {number} row\n    * @param {number} column\n    */\n    add_pulsar(row, column) {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_add_pulsar\"](this.ptr, row, column);\n    }\n    /**\n    */\n    set_random() {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_set_random\"](this.ptr);\n    }\n    /**\n    */\n    clear() {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_clear\"](this.ptr);\n    }\n}\n\nfunction __wbg_new_693216e109162396() {\n    var ret = new Error();\n    return addHeapObject(ret);\n};\n\nfunction __wbg_stack_0ddaca5d1abfb52f(arg0, arg1) {\n    var ret = getObject(arg1).stack;\n    var ptr0 = passStringToWasm0(ret, _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n    var len0 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len0;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr0;\n};\n\nfunction __wbg_error_09919627ac0992f5(arg0, arg1) {\n    try {\n        console.error(getStringFromWasm0(arg0, arg1));\n    } finally {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](arg0, arg1);\n    }\n};\n\nfunction __wbindgen_object_drop_ref(arg0) {\n    takeObject(arg0);\n};\n\nconst __wbg_random_7b8246250fd79f60 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../www/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///../pkg/wasm_game_of_life_bg.js?");

/***/ }),

/***/ "../pkg/wasm_game_of_life_bg.wasm":
/*!****************************************!*\
  !*** ../pkg/wasm_game_of_life_bg.wasm ***!
  \****************************************/
/*! exports provided: memory, __wbg_universe_free, universe_new, universe_width, universe_height, universe_cells, universe_tick, universe_toggle_cell, universe_add_glider, universe_add_pulsar, universe_set_random, universe_clear, __wbindgen_free, __wbindgen_malloc, __wbindgen_realloc */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./wasm_game_of_life_bg.js */ \"../pkg/wasm_game_of_life_bg.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/wasm_game_of_life_bg.wasm?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./src/fps.js":
/*!********************!*\
  !*** ./src/fps.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FramesGraph; });\nclass FramesGraph {\n  constructor(element) {\n    this.fps = element;\n    this.frames = [];\n    this.lastFrameTimeStamp = performance.now();\n  }\n\n  render() {\n    // Convert the delta time since the last frame render into a measure\n    // of frames per second.\n    const now = performance.now();\n    const delta = now - this.lastFrameTimeStamp;\n    this.lastFrameTimeStamp = now;\n    const fps = (1 / delta) * 1000;\n\n    // Save only the latest 100 timings.\n    this.frames.push(fps);\n    if (this.frames.length > 100) {\n      this.frames.shift();\n    }\n\n    // Find the max, min, and mean of our 100 latest timings.\n    let min = Infinity;\n    let max = -Infinity;\n    let sum = 0;\n    for (let i = 0; i < this.frames.length; i++) {\n      sum += this.frames[i];\n      min = Math.min(this.frames[i], min);\n      max = Math.max(this.frames[i], max);\n    }\n    let mean = sum / this.frames.length;\n\n    // Render the statistics.\n    this.fps.textContent = `\nFrames per Second:\n         latest = ${Math.round(fps)}\navg of last 100 = ${Math.round(mean)}\nmin of last 100 = ${Math.round(min)}\nmax of last 100 = ${Math.round(max)}\n`.trim();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/fps.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wasm_game_of_life__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-game-of-life */ \"../pkg/wasm_game_of_life.js\");\n/* harmony import */ var wasm_game_of_life_wasm_game_of_life_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wasm-game-of-life/wasm_game_of_life_bg */ \"../pkg/wasm_game_of_life_bg.wasm\");\n/* harmony import */ var _fps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fps */ \"./src/fps.js\");\n\n// import { Universe } from \"/pkg/wasm-game-of-life\";\n// Import the WebAssembly memory\n\n// import { memory } from \"/pkg/wasm-game-of-life/wasm_game_of_life_bg\";\n\n\n\nconst main = () => {\n  const documentStyle = getComputedStyle(document.documentElement);\n\n  const colors = {\n    success: documentStyle.getPropertyValue(\"--success\"),\n    warning: documentStyle.getPropertyValue(\"--warning\"),\n    monochrome100: documentStyle.getPropertyValue(\"--monochrome-100\"),\n    monochrome700: documentStyle.getPropertyValue(\"--monochrome-700\"),\n    monochrome900: documentStyle.getPropertyValue(\"--monochrome-900\"),\n    white: documentStyle.getPropertyValue(\"--white\"),\n  };\n\n  // Settings\n  const CELL_SIZE = 8;\n  const GRID_COLOR = colors.monochrome700;\n  const DEAD_COLOR = colors.monochrome900;\n  const ALIVE_COLOR = colors.white;\n  // TODO: make board size configurable\n  const width = 64;\n  const height = 64;\n  // const width = 123;\n  // const height = 69;\n\n  let fps = 30;\n  let animationId = null;\n  let previousDelta = 0;\n  let isGridShown = true;\n  let isControlPressed = false;\n  let isShiftPressed = false;\n  let isFpsShown = false;\n\n  // Utils\n  const toggleGrid = () => {\n    if (isGridShown) {\n      gridButton.textContent = \"Show Grid\";\n      clearGrid();\n      isGridShown = false;\n    } else {\n      gridButton.textContent = \"Hide Grid\";\n      drawGrid();\n      isGridShown = true;\n    }\n  };\n\n  const toggleFps = () => {\n    if (isFpsShown) {\n      fpsButton.textContent = \"Show FPS\";\n      fpsCounter.style.display = \"none\";\n      isFpsShown = false;\n    } else {\n      framesGraph.render();\n      fpsButton.textContent = \"Hide FPS\";\n      fpsCounter.style.display = \"block\";\n      isFpsShown = true;\n    }\n  };\n\n  const togglePlay = () => {\n    animationId === null ? play() : pause();\n  };\n\n  const stepForward = () => {\n    pause();\n    universe.tick();\n    drawCells();\n  };\n\n  const randomizeBoard = () => {\n    pause();\n    universe.set_random();\n    drawCells();\n  };\n\n  const clearBoard = () => {\n    pause();\n    universe.clear();\n    drawCells();\n  };\n\n  const saveBoard = () => {\n    const cellsPtr = universe.cells();\n    const cells = wasmByteMemoryArray.slice(\n      cellsPtr,\n      cellsPtr + (width * height) / 8\n    );\n\n    pause();\n    localStorage.setItem(\"saveState\", JSON.stringify(cells));\n    loadButton.disabled = false;\n  };\n\n  const loadBoard = () => {\n    const cellsPtr = universe.cells();\n    const cells = JSON.parse(localStorage.getItem(\"saveState\"));\n\n    if (cells) {\n      Object.keys(cells).forEach((_cell, index) => {\n        wasmByteMemoryArray[cellsPtr + index] = cells[index];\n      });\n\n      pause();\n      drawCells();\n    } else {\n      // TODO: handle no saveState\n    }\n  };\n\n  const play = () => {\n    playButton.textContent = \"⏸ Pause\";\n    playButton.style.background = colors[\"warning\"];\n    renderLoop();\n  };\n\n  const pause = () => {\n    playButton.textContent = \"▶ Run\";\n    playButton.style.background = colors[\"success\"];\n    cancelAnimationFrame(animationId);\n    animationId = null;\n  };\n\n  const fpsCounter = document.getElementById(\"fps-counter\");\n\n  // Controls\n  const playButton = document.getElementById(\"btn-play\");\n  const stepButton = document.getElementById(\"btn-step\");\n  const randomButton = document.getElementById(\"btn-random\");\n  const clearButton = document.getElementById(\"btn-clear\");\n  const gridButton = document.getElementById(\"btn-grid\");\n  const fpsButton = document.getElementById(\"btn-fps\");\n  const fpsInput = document.getElementById(\"input-fps\");\n  const saveButton = document.getElementById(\"btn-save\");\n  const loadButton = document.getElementById(\"btn-load\");\n\n  playButton.addEventListener(\"click\", togglePlay);\n  stepButton.addEventListener(\"click\", stepForward);\n  randomButton.addEventListener(\"click\", randomizeBoard);\n  gridButton.addEventListener(\"click\", toggleGrid);\n  clearButton.addEventListener(\"click\", clearBoard);\n  saveButton.addEventListener(\"click\", saveBoard);\n  loadButton.addEventListener(\"click\", loadBoard);\n  fpsButton.addEventListener(\"click\", toggleFps);\n  fpsInput.addEventListener(\"change\", (event) => (fps = event.target.value));\n\n  // Construct the universe\n  const universe = wasm_game_of_life__WEBPACK_IMPORTED_MODULE_0__[\"Universe\"].new(width, height);\n\n  // Create a Uint8Array to give us access to Wasm Memory\n  const wasmByteMemoryArray = new Uint8Array(wasm_game_of_life_wasm_game_of_life_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer);\n\n  // Give the canvas room for all of our cells and a 1px border\n  // around each of them.\n  const canvas = document.getElementById(\"canvas\");\n  canvas.height = (CELL_SIZE + 1) * height + 1;\n  canvas.width = (CELL_SIZE + 1) * width + 1;\n  const ctx = canvas.getContext(\"2d\");\n\n  const framesGraph = new _fps__WEBPACK_IMPORTED_MODULE_2__[\"default\"](fpsCounter);\n\n  const renderLoop = (currentDelta) => {\n    if (isFpsShown) {\n      framesGraph.render();\n    }\n\n    animationId = requestAnimationFrame(renderLoop);\n\n    const delta = currentDelta - previousDelta;\n    if (delta < 1000 / fps) return;\n\n    universe.tick();\n\n    drawCells();\n\n    previousDelta = currentDelta;\n  };\n\n  const drawGrid = () => {\n    ctx.beginPath();\n    ctx.strokeStyle = GRID_COLOR;\n\n    // Vertical lines.\n    for (let i = 0; i <= width; i++) {\n      ctx.moveTo(i * (CELL_SIZE + 1) + 0.5, 0);\n      ctx.lineTo(i * (CELL_SIZE + 1) + 0.5, (CELL_SIZE + 1) * height + 1);\n    }\n\n    // Horizontal lines.\n    for (let j = 0; j <= height; j++) {\n      ctx.moveTo(0, j * (CELL_SIZE + 1) + 0.5);\n      ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 0.5);\n    }\n\n    ctx.stroke();\n  };\n\n  const clearGrid = () => {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    drawCells();\n  };\n\n  const getIndex = (row, column) => {\n    return row * width + column;\n  };\n\n  const isBitSet = (n, arr) => {\n    const byte = Math.floor(n / 8);\n    const mask = 1 << n % 8;\n    return (arr[byte] & mask) === mask;\n  };\n\n  const drawCells = () => {\n    const cellsPtr = universe.cells();\n    const cells = wasmByteMemoryArray.slice(\n      cellsPtr,\n      cellsPtr + (width * height) / 8\n    );\n\n    ctx.beginPath();\n\n    // Alive cells.\n    ctx.fillStyle = ALIVE_COLOR;\n    for (let row = 0; row < height; row++) {\n      for (let col = 0; col < width; col++) {\n        const idx = getIndex(row, col);\n        if (!isBitSet(idx, cells)) {\n          continue;\n        }\n\n        ctx.fillRect(\n          col * (CELL_SIZE + 1) + 1,\n          row * (CELL_SIZE + 1) + 1,\n          CELL_SIZE,\n          CELL_SIZE\n        );\n      }\n    }\n\n    // Dead cells.\n    ctx.fillStyle = DEAD_COLOR;\n    for (let row = 0; row < height; row++) {\n      for (let col = 0; col < width; col++) {\n        const idx = getIndex(row, col);\n        if (isBitSet(idx, cells)) {\n          continue;\n        }\n\n        ctx.fillRect(\n          col * (CELL_SIZE + 1) + 1,\n          row * (CELL_SIZE + 1) + 1,\n          CELL_SIZE,\n          CELL_SIZE\n        );\n      }\n    }\n\n    ctx.stroke();\n  };\n\n  // Drawing cell patterns\n  canvas.addEventListener(\"click\", (event) => {\n    const boundingRect = canvas.getBoundingClientRect();\n\n    const scaleX = canvas.width / boundingRect.width;\n    const scaleY = canvas.height / boundingRect.height;\n\n    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;\n    const canvasTop = (event.clientY - boundingRect.top) * scaleY;\n\n    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);\n    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);\n\n    if (isControlPressed) {\n      universe.add_glider(row, col);\n    } else if (isShiftPressed) {\n      universe.add_pulsar(row, col);\n    } else {\n      universe.toggle_cell(row, col);\n    }\n\n    drawCells();\n  });\n\n  document.addEventListener(\"keydown\", (event) => {\n    if (event.code === \"Space\") {\n      event.preventDefault();\n      // reset focus\n      if (document.activeElement != document.body)\n        document.activeElement.blur();\n      togglePlay();\n    }\n\n    if (event.key === \"ArrowRight\") {\n      stepForward();\n    }\n\n    if (event.key === \"c\" && !isControlPressed) {\n      clearBoard();\n    }\n\n    if (event.key === \"s\" && !isControlPressed) {\n      saveBoard();\n    }\n\n    if (event.key === \"r\" && !isControlPressed) {\n      loadBoard();\n    }\n\n    if (event.key === \"Control\") {\n      isControlPressed = true;\n    }\n\n    if (event.key === \"Shift\") {\n      isShiftPressed = true;\n    }\n  });\n\n  document.addEventListener(\"keyup\", (event) => {\n    if (event.key === \"Control\") {\n      isControlPressed = false;\n    }\n\n    if (event.key === \"Shift\") {\n      isShiftPressed = false;\n    }\n  });\n\n  if (localStorage.getItem(\"saveState\")) {\n    loadButton.disabled = false;\n  }\n\n  // initial render\n  const start = () => {\n    universe.add_glider(5, 5);\n    universe.add_pulsar(40, 40);\n    drawGrid();\n    drawCells();\n  };\n\n  start();\n};\n\nif (document.readyState !== \"loading\") {\n  main();\n} else {\n  document.addEventListener(\"DOMContentLoaded\", main);\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

}]);