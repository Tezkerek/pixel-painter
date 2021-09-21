import { boundMethod } from "autobind-decorator";
import React from "react";
import "react-color-palette/lib/css/styles.css";
import { ColorButton, Ref as ColorButtonRef } from "./ColorButton";
import { ColorPickerPopup } from "./ColorPickerPopup";
import "./ControlsSidebar.css";

export class ControlsSidebar extends React.Component<
  ControlsSidebarProps,
  ControlsSidebarState
> {
  colorButton: React.RefObject<ColorButtonRef>;

  constructor(props: ControlsSidebarProps) {
    super(props);

    this.state = {
      showColorPicker: false,
    };

    this.colorButton = React.createRef();
  }

  @boundMethod
  handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange({
      [ev.target.name]: ev.target.value,
    });
  }

  @boundMethod
  toggleColorPopup(visible?: boolean) {
    if (visible == null) {
      visible = !this.state.showColorPicker;
    }
    this.setState({ showColorPicker: visible });
  }

  render() {
    return (
      <div className="ControlsSidebar">
        <input
          className="sidebar-control-input"
          name="rows"
          type="number"
          placeholder="Rows"
          value={this.props.rows}
          onChange={this.handleChange}
        />

        <input
          className="sidebar-control-input"
          name="cols"
          type="number"
          placeholder="Columns"
          value={this.props.cols}
          onChange={this.handleChange}
        />

        <ColorButton
          color={this.props.color}
          name="color"
          type="button"
          onClick={() => this.toggleColorPopup()}
          ref={this.colorButton}
        />

        <ColorPickerPopup
          color={this.props.color}
          visible={this.state.showColorPicker}
          onChange={(color) => this.props.onChange({ color: color })}
          onClose={() => this.toggleColorPopup(false)}
          anchor={this.colorButton.current}
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
