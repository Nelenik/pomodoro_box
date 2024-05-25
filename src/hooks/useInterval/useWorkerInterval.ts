import { useRef, useEffect } from "react";

type CB = () => void;
export const useWorkerInterval = (
  callback: CB,
  delay: number | null,
  active: boolean
) => {
  const savedCallback = useRef<CB>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const workerRef = useRef<Worker>();

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
    }
    if (active && delay !== null) {
      const code = `
      setInterval(() => {
        postMessage("");
      }, ${delay});
    `;
      const blob = new Blob([code], { type: "application/javascript" });
      workerRef.current = new Worker(URL.createObjectURL(blob));

      workerRef.current.addEventListener("message", () => {
        try {
          savedCallback.current();
        } catch (error) {
          console.error("Error in worker interval callback:", error);
        }
      });
      return () => {
        workerRef.current?.terminate();
        workerRef.current = undefined;
      };
    }
  }, [delay, active]);
};
