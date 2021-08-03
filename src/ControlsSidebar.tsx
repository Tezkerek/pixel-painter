import { boundMethod } from "autobind-decorator";
import React from "react";

export class ControlsSidebar extends React.Component<
  ControlsSidebarProps,
  ControlsSidebarState
> {
  constructor(props: ControlsSidebarProps) {
    super(props);
  }

  @boundMethod
  handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange({
      [ev.target.name]: ev.target.value,
    });
  }

  render() {
    return (
      <div className="sidebar">
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
      </div>
    );
  }
}

interface ControlsSidebarProps {
  rows: number;
  cols: number;
  onChange: (newValues: ControlValues) => void;
}

interface ControlsSidebarState {}

export interface ControlValues {
  rows?: number;
  cols?: number;
}
