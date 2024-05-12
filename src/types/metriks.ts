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
