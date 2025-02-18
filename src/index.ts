// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Sqids from 'sqids'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/sqids", (req: Request, res: Response) => {
  const sqids = new Sqids({
    alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    // alphabet: 'vPQ0MdX1YSu7nkU5WJDzRwGEqFxcZAjB3KgNoiTV6lm294bCIpOthyHa8sLref',
    // alphabet: 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789',
    // alphabet: 'x8faJ3rYzkQ6FRywX4eZEpVSqhjtDnT7C9AP5sbWNcgvKMdGuHUB2m',
    // alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    // alphabet: 'PNZX081GJHC725TSLFEU96KIQRWB4DYVOM3A',
    minLength: 8,
  })
  // const id = sqids.encode([12345678, 43668760])// "B4aajs"
  // alphanuberic                              : 2999999999999 => xvjxVGza
  // alphanumeric(i, l, o, I, L, O, 0, 1 제외) : 1174711139836 => vcSgMbqEU
  // capatal and numeric                       : 59999999999 => 7FQUHJTC
  const id = sqids.encode([2999999999999])// "B4aajs"
  const numbers = sqids.decode(id) // [1, 2, 3]
  res.send(id + ' => ' + numbers + '\n');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
