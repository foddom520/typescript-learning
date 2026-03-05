import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import * as dotenv from 'dotenv';
import { z } from 'zod';
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
const app = new Hono();
serve({
    fetch: app.fetch,
    port: env.PORT,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
