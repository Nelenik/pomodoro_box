import { useBrowserInterval } from "./useBrowserInterval";
import { useWorkerInterval } from "./useWorkerInterval";

type IntervalType = "default" | "worker";

export const useInterval = (
  callback: () => void,
  delay: number | null,
  type: IntervalType = "default"
) => {
  const isSupportedWorker = !!window.Worker;
  const enableBrowserInterval = type === "default" || !isSupportedWorker;
  const enableWorkerInteval = type === "worker" && isSupportedWorker;

  useBrowserInterval(callback, delay, enableBrowserInterval);
  useWorkerInterval(callback, delay, enableWorkerInteval);
};
