// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Sqids from 'sqids'
import Hashids from 'hashids'

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
    // alphabet: 'WBgKVACxUeHamzRYvZrwfSET29hqJM78nFPtd5pc3G6DQsykjNuX4b',
    // alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    // alphabet: 'PNZX081GJHC725TSLFEU96KIQRWB4DYVOM3A',
    minLength: 8,
  })
  // const id = sqids.encode([12345678, 43668760])// "B4aajs"
  // alphanuberic                                 : 3142742836020 => pppppppp
  // alphanumeric(remove i, l, o, I, L, O, 0, 1)  : 1174711139836 => XXXXXXXX
  // capatal and numeric                          : 64339296874 => 55555555
  const id = sqids.encode([64339296874])// "B4aajs"
  const numbers = sqids.decode(id) // [1, 2, 3]
  res.send(id + ' => ' + numbers + '\n');
});

app.get("/hashids", (req: Request, res: Response) => {
  const hashids = new Hashids(
    /* salt: */ 'This is my salt',
    /* minLength: */ 8,
    /* alphabet: '🌸💮🏵️🌹🥀🌺🌻🌼🌷🌱🌲🌳🌴🌵🌾🌿☘️🍀🍁🍂🍃🍄', */
    /* alphabet: */ 'WBgKVACxUeHamzRYvZrwfSET29hqJM78nFPtd5pc3G6DQsykjNuX4b',
    /* these chars can't be next to one another: */ '',
  );

  const orgValue = 6433929687;
  const value = hashids.encode([orgValue]);
  const decoded = hashids.decode(value);
  res.send(decoded + ' => ' + value + '\n');
});
  
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
