import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import * as dotenv from 'dotenv';
import { z } from 'zod';
import { readFile, writeFile } from 'node:fs/promises';
import mysql from 'mysql2/promise';
dotenv.config();
const envSchema = z.object({
    DB_PORT: z.coerce
        .number() //számmá alakítja az .env ből kapott string-et.
        .refine((val) => val === 3306 || val === 3307, //he ezek egyeike sem, ben engedi a szerver indítását és hibát dob.
    {
        message: 'DB_PORT must be either 3306 or 3307', //hibaüzenet ha nem felel meg a refine paramétereinek.
    }).default(3306), // ha nincs megadva a .env-ben akkor alapértelmezettként be állítja a 3306-ot.
    DB_HOST: z.string() // biztosítja, hogy egy string.
        .min(1) // megszabja, hogy legalább 1 karakternek kel lennie, hogy le engedjen üres string-et.
        .default('localhost'), // alapéretelezettem be állítja a localhost-ot.
    DB_USER: z.string().min(1)
        .default('root'), // alapéretelezettem be állítja a root-ot.
    DB_PASSWORD: z.string(), // engedéjez üres string-et is, ha nincs a servernek jelszava.
    DB_NAME: z.string().min(1).default('typescript_learning'),
    PORT: z.coerce.number().default(3000), // a szerver backend portja, ha nincs megadva a .env-ben akkor az alapértelmezett porton ami a 3000 fog futni.
});
// ha a fentiek közül egyiknek nem felel meg valami, akkor le crashel a server.
const env = envSchema.parse(process.env);
// const env = process.env ez is megfelel a célnak, viszont a fenti rész egy jobb és biztonságosabb megoldás.
const app = new Hono();
const pool = mysql.createPool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    waitForConnections: true, // oké talán ez nem mindenkinek, annyit csinál, hogy meg várja a csatlakozást az adatbázishoz.
});
// le teszteljük hogy tudunk e sikeresen csatlakozni az adatbázishoz, ha igen akkor kiírjuk hogy igen és lecsatlakozunk, ha nem akkor egy segéd szüveg után ki írjuk miért.
try {
    const connection = await pool.getConnection();
    console.log('Sikeresen csatlakozott az adatbázishoz!');
    connection.release();
}
catch (err) {
    console.error('Hiba az adatbázishoz való csatlakozás közben. Ellenőrizza, hogy fut-e a XAMPP adatbázis!');
    console.error(err);
}
// logolás middleware, minden requestet logol a data.json fájlba.
app.use('*', async (c, next) => {
    await next(); // megvárja, hogy a handler lefusson.
    const LogEntry = {
        // a log befejezésének időpontja. 
        timestamp: new Date()
            .toISOString(), // átalakítja egy ISO formátumú stringgé a könyebb olvashatóságért.
        methood: c.req.method, // a request methodja.
        path: c.req.path, // a request útvonala.
        status: c.res.status, // a response statusa.
    };
    // megpróbálunk logolni a data.json-be, ha sikerül akkor csak be töljük, ha nem akkor kiadjuk a hibát egy üzenettel.
    try {
        const currentData = JSON.parse(await readFile('./data.json', 'utf-8') || '[]');
        currentData.push(LogEntry);
        await writeFile('./data.json', JSON.stringify(currentData, null, 2));
    }
    catch (err) {
        console.error('Sikertelen logoás a data.json fájlba:', err);
    }
});
// endpontok
app.get('');
serve({
    fetch: app.fetch,
    port: env.PORT,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
