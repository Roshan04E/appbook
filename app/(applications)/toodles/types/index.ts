export type InsertTodoType = {
  user_id: string;
  title: string;
  description: string;
  priority: number;
  due_date: Date;
};

export type Todo = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  priority: number;
  due_date: Date | null;
  created_at: Date;
  updated_at: Date;
};
