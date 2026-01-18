import { motion } from "motion/react";
import { Todo } from "../types";
import { useTransition } from "react";
import {
  deleteTodo,
  toggleTodoComplete,
} from "@/lib/database/tables/todos/todos-action";
import { TrashSimpleIcon } from "@phosphor-icons/react";

export default function TodoItem({
  todo,
  setTodos,
}: {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}) {
  const [isPending, startTransition] = useTransition();

  function toggle() {
    // 1. optimistic update
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, is_completed: !t.is_completed } : t,
      ),
    );

    // 2. sync with DB
    startTransition(async () => {
      const updated = await toggleTodoComplete(todo.id);

      // 3. revert if failed
      if (!updated) {
        setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)));
      }
    });
  }

  function del() {
    const backup = todo; // keep copy

    // 1. remove instantly
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));

    // 2. sync DB
    startTransition(async () => {
      const ok = await deleteTodo(todo.id);

      // 3. revert if failed
      if (!ok) {
        setTodos((prev) => [backup, ...prev]);
      }
    });
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto w-full bg-white p-3 rounded-xl flex items-center justify-between"
    >
      <div
        onClick={toggle}
        className={`cursor-pointer ${
          todo.is_completed ? "line-through text-zinc-400" : "text-zinc-900"
        }`}
      >
        {todo.title}
      </div>

      <motion.button
        whileHover={{ scale: 1.2 }}
        onClick={del}
        className="text-red-400 h-10 w-10 rounded-full hover:bg-red-400 hover:text-red-100 flex items-center justify-center"
      >
        <TrashSimpleIcon />
      </motion.button>
    </motion.div>
  );
}
