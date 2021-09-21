import { useRef } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

import "./ColorPickerPopup.css";
import useOutsideClick from "../hooks/useOutsideClick";

export function ColorPickerPopup(props: Props) {
  const [color, setColor] = useColor("hex", props.color);

  const popupRef = useRef<HTMLDivElement>(null);
  useOutsideClick(popupRef, () => {
    if (props.visible) {
      props.onClose?.();
    }
  });

  let computedPosition = computePopupPosition(
    props.anchor?.getBoundingClientRect()
  );

  return (
    <div
      className={"ColorPickerPopup " + (props.visible ? "" : "hidden")}
      style={{ top: computedPosition.top, left: computedPosition.left }}
      ref={popupRef}
    >
      <ColorPicker width={200} color={color} alpha onChange={setColor} />
      <input
        className="button accent"
        type="button"
        value="OK"
        onClick={() => props.onChange(color.hex)}
      />
    </div>
  );
}

interface Props {
  color: string;
  visible: boolean;
  onChange: (newColor: string) => void;
  onClose?: () => void;
  anchor: HTMLElement | null;
}

function computePopupPosition(anchorRect?: DOMRect) {
  // TODO: make sure popup doesn't go off screen
  let top = 200;
  let left = 200;

  if (anchorRect != null) {
    top = anchorRect.top + anchorRect.height - 125;
    left = anchorRect.left + anchorRect.width + 25;
  }

  return { top, left };
}
