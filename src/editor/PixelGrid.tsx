import { useCallback, useRef, useState } from "react";
import * as Konva from "react-konva";
import { useImmer } from "use-immer";
import { ColoredGrid, Pixel } from "./ColoredGrid";

export function PixelGrid(props: Props) {
  const [canvasConfig, setCanvasConfig] = useState({
    width: 1000,
    height: 1000,
  });
  const [grid, setGrid] = useImmer(new ColoredGrid(props.rows, props.cols));
  const isPainting = useRef(false);

  const colorPixel = useCallback(
    (row: number, col: number) => {
      setGrid((draftGrid) => {
        draftGrid.updatePixelAt(row, col, props.brushColor);
      });
    },
    [setGrid, props.brushColor]
  );

  grid.updateSize(props.rows, props.cols);

  const renderedPixels: JSX.Element[] = [];
  for (let row = 0; row < props.rows; row++) {
    for (let col = 0; col < props.cols; col++) {
      const pixel: Pixel = grid.getPixelAt(row, col);
      const width = props.pixelWidth;
      const height = props.pixelHeight;
      renderedPixels.push(
        <Konva.Rect
          x={col * width + 1}
          y={row * height + 1}
          width={width}
          height={height}
          fill={pixel.color}
          stroke="black"
          onClick={() => colorPixel(row, col)}
          onMouseMove={() => {
            if (isPainting.current) {
              colorPixel(row, col);
            }
          }}
        />
      );
    }
  }

  return (
    <Konva.Stage
      className="PixelCanvas"
      width={canvasConfig.width}
      height={canvasConfig.height}
      onMouseDown={() => (isPainting.current = true)}
      onMouseUp={() => (isPainting.current = false)}
    >
      <Konva.Layer>{renderedPixels}</Konva.Layer>
    </Konva.Stage>
  );
}

interface Props {
  rows: number;
  cols: number;
  pixelWidth: number;
  pixelHeight: number;
  brushColor?: string;
}

interface PixelGridState {
  canvasWidth: number;
  canvasHeight: number;
  grid: ColoredGrid;
  isPainting: boolean;
}
