import { boundMethod } from "autobind-decorator";
import React from "react";
import "react-color-palette/lib/css/styles.css";
import { ColorPickerPopup } from "./ColorPickerPopup";
import "./ControlsSidebar.css";

export class ControlsSidebar extends React.Component<
  ControlsSidebarProps,
  ControlsSidebarState
> {
  constructor(props: ControlsSidebarProps) {
    super(props);

    this.state = {
      showColorPicker: false,
    };
  }

  @boundMethod
  handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange({
      [ev.target.name]: ev.target.value,
    });
  }

  @boundMethod
  showColorPopup() {
    this.setState({ showColorPicker: true });
    console.log(this.state);
  }

  render() {
    return (
      <div className="ControlsSidebar">
        <input
          name="rows"
          type="number"
          placeholder="Rows"
          value={this.props.rows}
          onChange={this.handleChange}
        />

        <input
          name="cols"
          type="number"
          placeholder="Columns"
          value={this.props.cols}
          onChange={this.handleChange}
        />

        <input name="color" type="button" onClick={this.showColorPopup} />

        <ColorPickerPopup
          color={this.props.color}
          hidden={!this.state.showColorPicker}
        />
      </div>
    );
  }
}

interface ControlsSidebarProps {
  rows: number;
  cols: number;
  color: string;
  onChange: (newValues: ControlValues) => void;
}

interface ControlsSidebarState {
  showColorPicker: boolean;
}

export interface ControlValues {
  rows?: number;
  cols?: number;
  color?: string;
}
