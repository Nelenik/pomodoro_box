import { z } from "zod";

const taskSchema = z.object({
  task: z.string(),
  done: z.boolean(),
  tomatoes: z.array(z.number().optional()),
});

export type Task = z.infer<typeof taskSchema>;

export type TasksListType = Task[];
