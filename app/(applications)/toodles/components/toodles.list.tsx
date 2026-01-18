import { Todo } from "../types";
import TodoItem from "./toodles.todo-item";

// ---------------- LIST ----------------
export default function TodoList({
  todos,
  setTodos,
}: {
  todos?: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}) {
  return (
    <div className="space-y-2   pb-2 ">
      {todos?.map((t: Todo) => (
        <TodoItem setTodos={setTodos} key={t.id} todo={t} />
      ))}
    </div>
  );
}
