"use server";
import pgClientPool from "../pg-client-pool";

const db = await pgClientPool();

// export async function getUsersAction() {
//   const client = await db.connect();
//   const res = await client.query("SELECT * FROM user");
//   return res.rows;
// }

export async function getUserByEmail(email: string) {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const res = await db.query(`SELECT * FROM users WHERE email = $1`, [
      cleanEmail,
    ]);
    return res.rows[0] || null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function createUser({
  name,
  email,
  avatar_url,
}: {
  name: string;
  email: string;
  avatar_url: string;
}) {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    const res = await db.query(
      `INSERT INTO users (name, email, avatar_url) VALUES ($1, $2, $3) RETURNING *`,
      [cleanName, cleanEmail, avatar_url],
    );
    return res.rows[0] || null;
  } catch (e) {
    console.log(e);
    return null;
  }
}
