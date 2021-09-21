import React from "react";
import * as Konva from "react-konva";
import { ColoredGrid, Pixel } from "./ColoredGrid";

export class PixelGrid extends React.Component<PixelGridProps, PixelGridState> {
  constructor(props: PixelGridProps) {
    super(props);
    this.state = {
      grid: new ColoredGrid(props.rows, props.cols),
    };
  }

  render() {
    this.state.grid.updateSize(this.props.rows, this.props.cols);

    const renderedPixels: JSX.Element[] = [];
    for (let row = 0; row < this.props.rows; row++) {
      for (let col = 0; col < this.props.cols; col++) {
        const pixel: Pixel = this.state.grid.getPixelAt(row, col);
        renderedPixels.push(
          <Konva.Rect
            x={col * this.props.pixelWidth}
            y={row * this.props.pixelHeight}
            width={this.props.pixelWidth}
            height={this.props.pixelHeight}
            stroke="black"
            fill={pixel.color}
          />
        );
      }
    }
    return renderedPixels;
  }
}

interface PixelGridProps {
  rows: number;
  cols: number;
  pixelWidth: number;
  pixelHeight: number;
}

class PixelGridState {
  constructor(public grid: ColoredGrid) {}
}
