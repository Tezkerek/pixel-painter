import { useEffect, useRef } from "react";

export default function useOutsideClick<T extends HTMLElement>(
  elementRef: React.RefObject<T>,
  clickHandler: () => void
) {
  const handlerRef = useRef(clickHandler);

  useEffect(() => {
    handlerRef.current = clickHandler;
  });

  useEffect(() => {
    document.addEventListener("click", handleClickEvent);
    return () => document.removeEventListener("click", handleClickEvent);
  }, []);

  function handleClickEvent(ev: MouseEvent) {
    // Call handler if click is outside of element
    if (!elementRef.current?.contains(ev.target as Node)) {
      handlerRef.current();
    }
  }
}
