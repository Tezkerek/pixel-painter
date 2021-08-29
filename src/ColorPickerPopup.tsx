import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

export function ColorPickerPopup(props: ColorPickerPopupProps) {
  const [color, setColor] = useColor("hex", props.color);

  return (
    <div
      className={"colorpicker-popup " + (props.hidden ? "hidden" : undefined)}
    >
      <ColorPicker width={200} color={color} alpha onChange={setColor} />
    </div>
  );
}

interface ColorPickerPopupProps {
  color: string;
  hidden: boolean;
}
