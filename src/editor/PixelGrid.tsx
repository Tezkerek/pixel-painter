import React from "react";
import * as Konva from "react-konva";
import { ColoredGrid, Pixel } from "./ColoredGrid";

export class PixelGrid extends React.Component<PixelGridProps, PixelGridState> {
  constructor(props: PixelGridProps) {
    super(props);
    this.state = {
      grid: new ColoredGrid(props.rows, props.cols),
      isPainting: false,
    };
  }

  render() {
    this.state.grid.updateSize(this.props.rows, this.props.cols);

    return (
      <Konva.Stage
        className="PixelCanvas"
        width={1000}
        height={900}
        onMouseDown={() => this.setState({ isPainting: true })}
        onMouseUp={() => this.setState({ isPainting: false })}
      >
        <Konva.Layer>{this.renderPixels()}</Konva.Layer>
      </Konva.Stage>
    );
  }

  renderPixels() {
    const renderedPixels: JSX.Element[] = [];

    for (let row = 0; row < this.props.rows; row++) {
      for (let col = 0; col < this.props.cols; col++) {
        const pixel: Pixel = this.state.grid.getPixelAt(row, col);
        renderedPixels.push(
          <Konva.Rect
            x={col * this.props.pixelWidth + 1}
            y={row * this.props.pixelHeight + 1}
            width={this.props.pixelWidth}
            height={this.props.pixelHeight}
            fill={pixel.color}
            stroke="black"
            onClick={() => this.colorPixel(row, col)}
            onMouseMove={() => {
              if (this.state.isPainting) {
                this.colorPixel(row, col);
              }
            }}
          />
        );
      }
    }
    return renderedPixels;
  }

  colorPixel(row: number, col: number) {
    this.state.grid.updatePixelAt(row, col, this.props.brushColor);
    this.setState({ grid: this.state.grid });
  }
}

interface PixelGridProps {
  rows: number;
  cols: number;
  pixelWidth: number;
  pixelHeight: number;
  brushColor?: string;
}

interface PixelGridState {
  grid: ColoredGrid;
  isPainting: boolean;
}
