export class ColoredGrid {
  updateSize(rows: number, cols: number) {
    // Initialize new rows and columns
    for (let row = 0; row < rows; row++) {
      let startIndexOfColumnsToInitialize = 0;
      if (row >= this.matrix.length) {
        // Initialize new row
        this.matrix[row] = [];
      } else {
        // Row exists, initialize only new columns
        startIndexOfColumnsToInitialize = this.matrix[row].length;
      }

      // Extend every row with new columns
      for (let col = startIndexOfColumnsToInitialize; col < cols; col++) {
        this.matrix[row][col] = { color: undefined };
      }
    }
  }
  constructor(rows: number, cols: number) {
    this.updateSize(rows, cols);
  }

  getPixelAt(row: number, col: number): Pixel {
    return this.matrix[row][col];
  }

  updatePixelAt(row: number, col: number, color?: string) {
    this.getPixelAt(row, col).color = color;
  }

  private matrix: Pixel[][] = [];
}

export interface Pixel {
  color: string | undefined;
}
