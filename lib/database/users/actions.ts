'use server'

import { redirect } from "next/navigation";
import { dbSecretsClient } from "./db.secrets";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import { log } from "console";

const db = await dbSecretsClient()

export async function getAllUsers() {
    const res = await db.query('SELECT * from users');
    return res.rows
}

export async function signUpUser({ email, password }: { email: string, password: string }) {
    try {
        const cleanEmail = email.trim().toLowerCase();
        if (cleanEmail === '') throw new Error("No email provided")
        const res = await db.query(`SELECT email FROM users WHERE users.email = $1`, [cleanEmail]);
        if (res.rows.length > 0) {
            log(`[AUTH] Signup attempt: ${cleanEmail}`)
            throw new Error('User already exist');
        }


        const salt = genSaltSync(10)
        const hashedPassword = await hashSync(password, salt)

        // push data to database
        await db.query(`INSERT INTO users (email, password) VALUES ($1, $2)`, [cleanEmail, hashedPassword])
        console.log(`[AUTH] Added user to database: ${cleanEmail}`);


        return {
            success: true,
            message: 'successfully signed Up.'
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Error while signing Up the user.'
        }
    }

}



export async function signInUser({ email, password }: { email: string, password: string }) {
    try {
        const cleanEmail = email.trim().toLowerCase();
        const res = await db.query(`SELECT * FROM users WHERE users.email = $1`, [cleanEmail]);
        const user = res.rows[0];

        if (!user) {
            return { success: false, message: 'User does not exist. Please sign up.' }
        }

        const isPasswordMatched = compareSync(password, user.password) // true / false

        if (!isPasswordMatched) {
            return {success: false, message: "Incorrect Password. Please try again"}
        }

        return {
            success: true,
            message: 'successfully signed in.'
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Error while signing the user.'
        }
    }

}


