export interface OneDay {
  completedTomatoes: number;
  stopCount: number;
  timeOnPause: number;
  totalTime: number;
  completedTasks: number;
}

export interface PomodoroMetriks {
  [key: string]: OneDay;
}

//metriks reducer typing
export interface MetriksAction {
  type: string;
}

export type RewriteAction = MetriksAction & {
  toChange: { [key: string]: unknown };
};

export type TimeMeasuresAction = MetriksAction & {
  fieldName: "timeOnPause" | "totalTime";
  initTimestamp: number;
};

export type ManageMetriksAction = RewriteAction | TimeMeasuresAction;

//metriks grouped by week
export type EntryMetriks = [string, OneDay][];

export type WeekData = {
  [key: string]: EntryMetriks;
};
