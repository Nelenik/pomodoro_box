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
      try {
        savedCallback.current();
      } catch (error) {
        console.error("Error in browser interval callback:", error);
      }
    }

    if (active && delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, active]);
};
