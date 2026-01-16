'use server';

import {Client} from 'pg';

const db = new Client({
    user: 'postgres',
    password: 'mnbv',
    host: 'localhost',
    port: 5432,
    database: 'testdb',
});



db.connect()

export async function getCapitals() {   
    const {rows} = await db.query(`SELECT * FROM public.capitals WHERE capital IS NOT NULL AND country IS NOT NULL ORDER BY id ASC`);
    const dataCount = await db.query(`SELECT COUNT(*) from public.capitals WHERE capital IS NOT NULL AND country IS NOT NULL`)
    
    
    
    return {
        data: rows,
        dataCount: Number(dataCount.rows[0].count)
    }
}

