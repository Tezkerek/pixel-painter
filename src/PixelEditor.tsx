import React from "react";
import * as Konva from "react-konva";

import { PixelGrid } from "./PixelGrid";
import { ControlsSidebar, ControlValues } from "./ControlsSidebar";
import { boundMethod } from "autobind-decorator";

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
    // console.log({ state: this.state, vals });
    this.setState((current) => ({ ...current, ...vals }));
  }

  render() {
    return (
      <div className="app-container">
        <ControlsSidebar
          rows={this.state.rows}
          cols={this.state.cols}
          onChange={(vals) => this.handleValuesChange(vals)}
        />
        <Konva.Stage className="pixel-canvas" width={1000} height={900}>
          <Konva.Layer>
            <PixelGrid
              rows={this.state.rows}
              cols={this.state.cols}
              pixelWidth={this.state.pixelWidth}
              pixelHeight={this.state.pixelHeight}
            />
          </Konva.Layer>
        </Konva.Stage>
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
  color: string | undefined;
}

const DEFAULT_STATE: PixelEditorState = {
  rows: 16,
  cols: 16,
  pixelWidth: 50,
  pixelHeight: 50,
  color: undefined,
};
