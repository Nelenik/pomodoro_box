interface OneDay {
  finishedTomatoes: number;
  breaksCount: number;
  timeOnPause: number;
  totalTime: number;
}

export interface PomodoroMetriks {
  [key: string]: OneDay;
}
