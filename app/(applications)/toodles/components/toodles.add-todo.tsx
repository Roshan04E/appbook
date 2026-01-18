import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { createTodo } from "@/lib/database/tables/todos/todos-action";
import { v4 as uuid } from "uuid";
import { useTransition } from "react";
import { Todo } from "../types";

// ---------------- ADD TODO ----------------
export function AddTodo({
  user_id,
  setTodos,
}: {
  user_id: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}) {
  // const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    const todo_title = formData.get("todo");
    const title = typeof todo_title === "string" ? todo_title : "Task Title";
    if (!title.trim()) return;

    const now = new Date();
    const tempId = uuid();

    // optimistic todo (matches Todo type)
    const optimisticTodo: Todo = {
      id: tempId,
      user_id,
      title,
      description: "",
      priority: 0,
      due_date: now,
      is_completed: false,
      created_at: now,
      updated_at: now,
    };

    // 1. instant UI
    setTodos((prev) => [optimisticTodo, ...prev]);

    // 2. sync DB
    startTransition(async () => {
      const res = await createTodo({
        user_id,
        title,
        description: "",
        priority: 0,
        due_date: now,
      });

      if (res) {
        // replace temp with real
        setTodos((prev) => prev.map((t) => (t.id === tempId ? res : t)));
      } else {
        // revert on fail
        setTodos((prev) => prev.filter((t) => t.id !== tempId));
      }
    });
  }

  return (
    <div className="py-7">
      <form action={handleSubmit} className="max-w-lg mx-auto">
        <div className="relative">
          <Input
            disabled={isPending}
            required
            name="todo"
            type="text"
            placeholder="Add a task..."
            autoComplete="off"
            spellCheck={false}
            className="w-full h-12 rounded-full pl-5 pr-14
              bg-white/90 border-none shadow-md"
          />

          <motion.button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-indigo-500 text-white flex items-center justify-center"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Plus size={18} />
          </motion.button>
        </div>
      </form>
    </div>
  );
}
