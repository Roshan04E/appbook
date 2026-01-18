"use server";

import pgClientPool from "../../pg-client-pool";

const db = await pgClientPool();

// -----------------------
// CREATE TODO
// -----------------------
export async function createTodo({
  user_id,
  title,
  description,
  priority = 0,
  due_date,
}: {
  user_id: string;
  title: string;
  description?: string;
  priority?: number;
  due_date?: Date | null;
}) {
  try {
    const result = await db.query(
      `INSERT INTO todos (user_id, title, description, priority, due_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, title.trim(), description || null, priority, due_date || null],
    );
    return result.rows[0];
  } catch (err) {
    console.error("Failed to create todo:", err);
    return null;
  }
}

// -----------------------
// UPDATE TODO
// -----------------------
export async function updateTodo({
  id,
  title,
  description,
  priority,
  due_date,
}: {
  id: string;
  title?: string;
  description?: string;
  priority?: number;
  due_date?: Date | null;
}) {
  const updates: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values: any[] = [];
  let i = 1;

  if (title !== undefined) {
    updates.push(`title = $${i++}`);
    values.push(title.trim());
  }
  if (description !== undefined) {
    updates.push(`description = $${i++}`);
    values.push(description);
  }
  if (priority !== undefined) {
    updates.push(`priority = $${i++}`);
    values.push(priority);
  }
  if (due_date !== undefined) {
    updates.push(`due_date = $${i++}`);
    values.push(due_date);
  }

  if (updates.length === 0) return null;

  try {
    const result = await db.query(
      `UPDATE todos SET ${updates.join(", ")} WHERE id = $${i} RETURNING *`,
      [...values, id],
    );
    return result.rows[0];
  } catch (err) {
    console.error("Failed to update todo:", err);
    return null;
  }
}

// -----------------------
// TOGGLE COMPLETE
// -----------------------
export async function toggleTodoComplete(id: string) {
  try {
    const result = await db.query(
      `UPDATE todos SET is_completed = NOT is_completed WHERE id = $1 RETURNING *`,
      [id],
    );
    return result.rows[0];
  } catch (err) {
    console.error("Failed to toggle todo:", err);
    return null;
  }
}

// -----------------------
// DELETE TODO
// -----------------------
export async function deleteTodo(id: string) {
  try {
    await db.query(`DELETE FROM todos WHERE id = $1`, [id]);
    return true;
  } catch (err) {
    console.error("Failed to delete todo:", err);
    return false;
  }
}

// -----------------------
// GET TODOS FOR USER
// -----------------------
export async function getUserTodos(user_id: string) {
  try {
    const result = await db.query(
      `SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC`,
      [user_id],
    );
    return result.rows;
  } catch (err) {
    console.error("Failed to fetch todos:", err);
    return [];
  }
}
