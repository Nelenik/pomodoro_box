interface OneDay {
  completedTomatoes: number;
  breaksCount: number;
  timeOnPause: number;
  totalTime: number;
  completedTasks: number;
}

export interface PomodoroMetriks {
  [key: string]: OneDay;
}
