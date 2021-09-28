import { useCallback, useEffect, useRef, useState } from "react";
import * as Konva from "react-konva";
import { useColoredGrid, ActionType as GridActionType } from "./useColoredGrid";

import "./PixelGrid.css";

export function PixelGrid(props: Props) {
  const isPainting = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [canvasConfig, setCanvasConfig] = useState({
    width: 1000,
    height: 1000,
  });
  const [grid, dispatchGrid] = useColoredGrid(props.rows, props.cols);

  useEffect(() => {
    if (containerRef.current != null) {
      setCanvasConfig({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, [
    setCanvasConfig,
    containerRef.current?.offsetWidth,
    containerRef.current?.offsetHeight,
  ]);

  const colorPixel = useCallback(
    (row: number, col: number) => {
      dispatchGrid({
        type: GridActionType.Color,
        row,
        col,
        color: props.brushColor,
      });
    },
    [dispatchGrid, props.brushColor]
  );

  const renderedPixels: JSX.Element[] = [];
  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      const pixel = grid.matrix[row][col];
      const width = props.pixelWidth;
      const height = props.pixelHeight;
      renderedPixels.push(
        <Konva.Rect
          key={`${row}_${col}`}
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
    <div className="PixelGrid" ref={containerRef}>
      <Konva.Stage
        className="PixelCanvas"
        width={canvasConfig.width}
        height={canvasConfig.height}
        onMouseDown={() => (isPainting.current = true)}
        onMouseUp={() => (isPainting.current = false)}
      >
        <Konva.Layer>{renderedPixels}</Konva.Layer>
      </Konva.Stage>
    </div>
  );
}

interface Props {
  rows: number;
  cols: number;
  pixelWidth: number;
  pixelHeight: number;
  brushColor?: string;
}
