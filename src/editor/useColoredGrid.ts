import { useEffect } from "react";
import { useImmerReducer } from "use-immer";

export function useColoredGrid(
  rows: number,
  cols: number
): [Grid, React.Dispatch<Action>] {
  const [grid, dispatch] = useImmerReducer(reducer, initializeGrid(rows, cols));

  useEffect(() => {
    dispatch({ type: ActionType.Resize, rows, cols });
  }, [rows, cols]);

  return [grid, dispatch];
}

export interface Pixel {
  color: string | undefined;
}

interface Grid {
  rows: number;
  cols: number;
  matrix: Pixel[][];
}

export enum ActionType {
  Resize = "RESIZE",
  Color = "COLOR",
}

type Action =
  | { type: ActionType.Resize; rows: number; cols: number }
  | { type: ActionType.Color; row: number; col: number; color?: string };

function reducer(draftGrid: Grid, action: Action) {
  switch (action.type) {
    case ActionType.Resize:
      resizeGrid(draftGrid, action.rows, action.cols);
      break;
    case ActionType.Color:
      draftGrid.matrix[action.row][action.col].color = action.color;
      break;
  }
}

function initializeGrid(rows: number, cols: number): Grid {
  const grid: Grid = {
    rows,
    cols,
    matrix: [],
  };

  for (let row = 0; row < rows; row++) {
    grid.matrix[row] = [];
    for (let col = 0; col < cols; col++) {
      grid.matrix[row][col] = { color: undefined };
    }
  }

  return grid;
}

function resizeGrid(grid: Grid, newRows: number, newCols: number) {
  for (let row = 0; row < newRows; row++) {
    if (row >= grid.matrix.length) {
      // Initialize new row
      grid.matrix[row] = [];
    }
    // Add new columns for row
    for (let col = grid.matrix[row].length; col < newCols; col++) {
      grid.matrix[row][col] = { color: undefined };
    }
  }

  grid.rows = newRows;
  grid.cols = newCols;
}
