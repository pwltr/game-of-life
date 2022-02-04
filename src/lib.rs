mod utils;

use fixedbitset::FixedBitSet;
use wasm_bindgen::prelude::*;

extern crate fixedbitset;
extern crate js_sys;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: FixedBitSet,
}

#[wasm_bindgen]
impl Universe {
    pub fn new(width: u32, height: u32) -> Universe {
        utils::set_panic_hook();

        let size = (width * height) as usize;
        let cells = FixedBitSet::with_capacity(size);

        Universe {
            width,
            height,
            cells,
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn cells(&self) -> *const u32 {
        self.cells.as_slice().as_ptr()
    }

    // Set the width of the universe.
    // Resets all cells to the dead state.
    // pub fn set_width(&mut self, width: u32) {
    //     self.width = width;
    //     // self.cells = (0..width * self.height).map(|_i| Cell::Dead).collect();

    //     let mut next = self.cells.clone();

    //     for row in 0..self.height {
    //         for col in 0..width {
    //             let idx = self.get_index(row, col);
    //             next.set(idx, false);
    //         }
    //     }

    //     self.cells = next;
    // }

    // Set the height of the universe.
    // Resets all cells to the dead state.
    // pub fn set_height(&mut self, height: u32) {
    //     self.height = height;
    //     // self.cells = (0..self.width * height).map(|_i| Cell::Dead).collect();

    //     let mut next = self.cells.clone();

    //     for row in 0..height {
    //         for col in 0..self.width {
    //             let idx = self.get_index(row, col);
    //             next.set(idx, false);
    //         }
    //     }

    //     self.cells = next;
    // }

    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;
        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (column + delta_col) % self.width;
                let idx = self.get_index(neighbor_row, neighbor_col);
                count += self.cells[idx] as u8;
            }
        }
        count
    }

    fn live_neighbor_count_performant(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;

        let north = if row == 0 { self.height - 1 } else { row - 1 };

        let south = if row == self.height - 1 { 0 } else { row + 1 };

        let west = if column == 0 {
            self.width - 1
        } else {
            column - 1
        };

        let east = if column == self.width - 1 {
            0
        } else {
            column + 1
        };

        let nw = self.get_index(north, west);
        count += self.cells[nw] as u8;
        let n = self.get_index(north, column);
        count += self.cells[n] as u8;
        let ne = self.get_index(north, east);
        count += self.cells[ne] as u8;
        let w = self.get_index(row, west);
        count += self.cells[w] as u8;
        let e = self.get_index(row, east);
        count += self.cells[e] as u8;
        let sw = self.get_index(south, west);
        count += self.cells[sw] as u8;
        let s = self.get_index(south, column);
        count += self.cells[s] as u8;
        let se = self.get_index(south, east);
        count += self.cells[se] as u8;

        count
    }

    pub fn tick(&mut self) {
        // let _timer = utils::Timer::new("Universe::tick");

        let mut next = {
            // let _timer = utils::Timer::new("allocate next cells");
            self.cells.clone()
        };

        {
            // let _timer = utils::Timer::new("new generation");
            for row in 0..self.height {
                for col in 0..self.width {
                    let idx = self.get_index(row, col);
                    let cell = self.cells[idx];
                    let live_neighbors = self.live_neighbor_count_performant(row, col);

                    let next_state = match (cell, live_neighbors) {
                        (true, x) if x < 2 => false,
                        (true, 2) | (true, 3) => true,
                        (true, x) if x > 3 => false,
                        (false, 3) => true,
                        (otherwise, _) => otherwise,
                    };

                    next.set(idx, next_state);
                }
            }
        }

        // let _timer = utils::Timer::new("free old cells");
        self.cells = next;
    }

    pub fn toggle_cell(&mut self, row: u32, column: u32) {
        let idx = self.get_index(row, column);
        self.cells.set(idx, !self.cells[idx]);
    }

    pub fn add_glider(&mut self, row: u32, column: u32) {
        let pattern = &[
            ((row - 1) % self.height, (column - 1) % self.width),
            ((row) % self.height, (column + 1) % self.height),
            ((row + 1) % self.height, (column - 1) % self.width),
            ((row + 1) % self.height, (column) % self.width),
            ((row + 1) % self.height, (column + 1) % self.width),
        ];

        for (row, col) in pattern.iter().cloned() {
            let idx = (row * self.width + col) as usize;
            self.cells.set(idx, true);
        }
    }

    pub fn add_pulsar(&mut self, row: u32, column: u32) {
        let pattern = &[
            ((row - 7) % self.height, (column + 3) % self.width),
            ((row - 7) % self.height, (column - 3) % self.width),
            ((row - 6) % self.height, (column - 3) % self.width),
            ((row - 6) % self.height, (column + 3) % self.width),
            ((row - 5) % self.height, (column - 3) % self.width),
            ((row - 5) % self.height, (column - 2) % self.width),
            ((row - 5) % self.height, (column + 2) % self.width),
            ((row - 5) % self.height, (column + 3) % self.width),
            ((row - 3) % self.height, (column - 7) % self.width),
            ((row - 3) % self.height, (column - 6) % self.width),
            ((row - 3) % self.height, (column - 5) % self.width),
            ((row - 3) % self.height, (column - 2) % self.width),
            ((row - 3) % self.height, (column - 1) % self.width),
            ((row - 3) % self.height, (column + 1) % self.width),
            ((row - 3) % self.height, (column + 2) % self.width),
            ((row - 3) % self.height, (column + 5) % self.width),
            ((row - 3) % self.height, (column + 6) % self.width),
            ((row - 3) % self.height, (column + 7) % self.width),
            ((row - 2) % self.height, (column - 5) % self.width),
            ((row - 2) % self.height, (column - 3) % self.width),
            ((row - 2) % self.height, (column - 1) % self.width),
            ((row - 2) % self.height, (column + 1) % self.width),
            ((row - 2) % self.height, (column + 3) % self.width),
            ((row - 2) % self.height, (column + 5) % self.width),
            ((row - 1) % self.height, (column - 3) % self.width),
            ((row - 1) % self.height, (column - 2) % self.width),
            ((row - 1) % self.height, (column + 2) % self.width),
            ((row - 1) % self.height, (column + 3) % self.width),
            ((row + 1) % self.height, (column - 3) % self.width),
            ((row + 1) % self.height, (column - 2) % self.width),
            ((row + 1) % self.height, (column + 2) % self.width),
            ((row + 1) % self.height, (column + 3) % self.width),
            ((row + 2) % self.height, (column - 5) % self.width),
            ((row + 2) % self.height, (column - 3) % self.width),
            ((row + 2) % self.height, (column - 1) % self.width),
            ((row + 2) % self.height, (column + 1) % self.width),
            ((row + 2) % self.height, (column + 3) % self.width),
            ((row + 2) % self.height, (column + 5) % self.width),
            ((row + 3) % self.height, (column - 7) % self.width),
            ((row + 3) % self.height, (column - 6) % self.width),
            ((row + 3) % self.height, (column - 5) % self.width),
            ((row + 3) % self.height, (column - 2) % self.width),
            ((row + 3) % self.height, (column - 1) % self.width),
            ((row + 3) % self.height, (column + 1) % self.width),
            ((row + 3) % self.height, (column + 2) % self.width),
            ((row + 3) % self.height, (column + 5) % self.width),
            ((row + 3) % self.height, (column + 6) % self.width),
            ((row + 3) % self.height, (column + 7) % self.width),
            ((row + 5) % self.height, (column - 3) % self.width),
            ((row + 5) % self.height, (column - 2) % self.width),
            ((row + 5) % self.height, (column + 2) % self.width),
            ((row + 5) % self.height, (column + 3) % self.width),
            ((row + 6) % self.height, (column - 3) % self.width),
            ((row + 6) % self.height, (column + 3) % self.width),
            ((row + 7) % self.height, (column - 3) % self.width),
            ((row + 7) % self.height, (column + 3) % self.width),
        ];

        for (row, col) in pattern.iter().cloned() {
            let idx = (row * self.width + col) as usize;
            self.cells.set(idx, true);
        }
    }

    pub fn set_random(&mut self) {
        let size = (self.width * self.height) as usize;
        let mut cells = FixedBitSet::with_capacity(size);

        for i in 0..size {
            cells.set(i, js_sys::Math::random() < 0.4);
        }

        self.cells = cells;
    }

    pub fn clear(&mut self) {
        let size = (self.width * self.height) as usize;
        let mut cells = FixedBitSet::with_capacity(size);

        for i in 0..size {
            cells.set(i, false);
        }

        self.cells = cells;
    }
}

impl Universe {
    // Get the dead and alive values of the entire universe.
    pub fn get_cells(&self) -> &FixedBitSet {
        &self.cells
    }

    // Set cells to be alive in a universe by passing the row and column
    // of each cell as an array.
    pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
        for (row, col) in cells.iter().cloned() {
            let idx = self.get_index(row, col);
            self.cells.set(idx, true);
        }
    }
}
