import React from "react";
import "./ColorButton.css";

export type Ref = HTMLDivElement;

export const ColorButton = React.forwardRef<Ref, Props>((props, ref) => {
  const { color, ...otherProps } = props;
  return (
    <div
      className="ColorButton"
      name="color"
      style={{ backgroundColor: color }}
      ref={ref}
      {...otherProps}
    />
  );
});

interface Props extends React.HTMLProps<Ref> {
  color: string;
}
