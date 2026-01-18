"use client";
import Header from "./components/toodles.header";
import { motion } from "motion/react";
import { AddTodo } from "./components/toodles.add-todo";
import TodoList from "./components/toodles.list";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Todo } from "./types";

export default function Toodles() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!userId) return;
    const loadData = async () => {
      const res = await fetch(`/api/toodles?userId=${userId}`);
      const data = await res.json();
      setTodos(data);
    };
    loadData();
  }, [userId]);

  if (!userId) return <>No user Id found. please sign in</>;
  return (
    <div className="flex justify-center items-center w-full">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full py-2 px-4"
      >
        <Header />
        <AddTodo setTodos={setTodos} user_id={userId} />
        <TodoList setTodos={setTodos} todos={todos} />
      </motion.div>
    </div>
  );
}
