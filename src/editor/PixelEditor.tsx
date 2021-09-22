import React from "react";
import * as Konva from "react-konva";

import { PixelGrid } from "./PixelGrid";
import { ControlsSidebar, ControlValues } from "./ControlsSidebar";
import { boundMethod } from "autobind-decorator";

import "./PixelEditor.css";

export class PixelEditor extends React.Component<
  PixelEditorProps,
  PixelEditorState
> {
  constructor(props: PixelEditorProps) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  @boundMethod
  handleValuesChange(vals: ControlValues) {
    this.setState((current) => ({ ...current, ...vals }));
  }

  render() {
    return (
      <div className="PixelEditor">
        <ControlsSidebar
          rows={this.state.rows}
          cols={this.state.cols}
          color={this.state.color}
          onChange={(vals) => this.handleValuesChange(vals)}
        />
        <PixelGrid
          rows={this.state.rows}
          cols={this.state.cols}
          pixelWidth={this.state.pixelWidth}
          pixelHeight={this.state.pixelHeight}
          brushColor={this.state.color}
        />
      </div>
    );
  }
}

interface PixelEditorProps {}

interface PixelEditorState {
  rows: number;
  cols: number;
  pixelWidth: number;
  pixelHeight: number;
  color: string;
}

const DEFAULT_STATE: PixelEditorState = {
  rows: 16,
  cols: 16,
  pixelWidth: 50,
  pixelHeight: 50,
  color: "#000000",
};
