import { useRef, useEffect } from "react";

type CB = () => void;

export const useBrowserInterval = (
  callback: CB,
  delay: number | null,
  active: boolean
) => {
  const savedCallback = useRef<CB>(() => {});
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (active && delay !== null) {
      console.log("browser interval");
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, active]);
};
