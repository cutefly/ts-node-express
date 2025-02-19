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

app.get("/sqids-demo", (req: Request, res: Response) => {
  const alphabet = process.env.SQIDS_ALPHABET || '';
  const minLength = parseInt(process.env.SQIDS_MIN_LENGTH || '');

  const sqids = new Sqids({
    alphabet: alphabet,
    minLength: minLength,
  })
  // alphanuberic                                 : 3142742836020 => pppppppp
  // alphanumeric(remove i, l, o, I, L, O, 0, 1)  : 1174711139836 => XXXXXXXX
  // capatal and numeric                          : 64339296874 => 55555555
  const id = sqids.encode([64339296874])// "B4aajs"
  const numbers = sqids.decode(id) // [1, 2, 3]
  console.log(`id: ${id}, numbers: ${numbers}`);
  res.send(id + ' => ' + numbers + '\n');
});

app.get("/hashids-demo", (req: Request, res: Response) => {
  const salt = process.env.HASHIDS_SALT || '';
  const alphabet = process.env.HASHIDS_ALPHABET || '';
  const minLength = parseInt(process.env.HASHIDS_MIN_LENGTH || ''); 
  const hashids = new Hashids(
    /* salt: */ salt,
    /* minLength: */ minLength,
    /* alphabet: */ alphabet,
    /* these chars can't be next to one another: */ '',
  );

  const orgValue = 6433929687;
  const value = hashids.encode([orgValue]);
  const decoded = hashids.decode(value);
  console.log(`id: ${value}, numbers: ${decoded}`);
  res.send(value + ' => ' + decoded + '\n');
});

const sqidsRouter = require("./router/sqids");
const hashidsRouter = require("./router/hashids");

app.use("/sqids", sqidsRouter);
app.use("/hashids", hashidsRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
