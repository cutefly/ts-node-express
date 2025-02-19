// src/router/sqids.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Sqids from 'sqids'

dotenv.config();

const router = express.Router();
const alphabet = process.env.SQIDS_ALPHABET || '';
const minLength = parseInt(process.env.SQIDS_MIN_LENGTH || '');

const sqids = new Sqids({
  alphabet: alphabet,
  minLength: minLength,
})

router.get("/encode/:sequence", (req: Request, res: Response) => {
  const sequence = Number(req.params.sequence)
  const id = sqids.encode([sequence])

  console.log(`sequence: ${sequence}, id: ${id}`);
  res.send(sequence + ' => ' + id + '\n');
});

router.get("/decode/:id", (req: Request, res: Response) => {
  const id = req.params.id
  const numbers = sqids.decode(id)
  const sequence = numbers[0]

  console.log(`id: ${id}, sequence: ${sequence}`);
  res.send(id + ' => ' + numbers + '\n');
});

module.exports = router;
