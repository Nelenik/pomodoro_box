import { isRewriteAction, isTimeMeasuresAction } from "@/types";
import { ManageMetriksAction, OneDay } from "@/types/metriks";
import { calculateTime } from "@/utils/calculateTime";
import { Reducer } from "react";

export const metriksReducer: Reducer<OneDay, ManageMetriksAction> = (
  todayMetriks,
  action
): OneDay => {
  switch (true) {
    case isRewriteAction(action) && action.type === "REWRITE_METRIKS": {
      return {
        ...todayMetriks,
        ...action.toChange,
      };
    }
    case isTimeMeasuresAction(action) &&
      action.type === "RENEW_TIME_MEASURES": {
      const currentTimestamp = performance.now();
      const timeInSec = calculateTime(action.initTimestamp, currentTimestamp);
      const newValue = todayMetriks[action.fieldName] + timeInSec;
      return {
        ...todayMetriks,
        [action.fieldName]: newValue,
      };
    }
    default:
      return todayMetriks;
  }
};
