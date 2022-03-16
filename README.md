<div align="center">

  <h1><code>WASM: A Conway's Game of Life</code></h1>

  <strong>A WebAssembly project using <a href="https://github.com/rustwasm/wasm-pack">wasm-pack</a>.</strong>
  
  ![Screenshot_20220203_012549](https://user-images.githubusercontent.com/8538369/152260472-e4a5cd90-8b9d-484e-aa16-ea479e9ef2dc.png)
</div>

## About

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine. - [Wikipedia](https://en.wikipedia.org/wiki/Conway's_Game_of_Life)

## 🚴 Usage

```
git clone https://github.com/pwltr/game-of-life.git
cd game-of-life
wasm-pack build
cd www
npm install
npm start
```

## Requirements

- Node.js
- Rust
- [wasm-pack](https://github.com/rustwasm/wasm-pack)
