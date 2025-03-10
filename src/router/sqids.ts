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

  console.log(`sequence: ${sequence}, id: ${id}, length: ${id.length}`)
  res.send(sequence + ' => ' + id + '\n')
});

router.get("/decode/:id", (req: Request, res: Response) => {
  const id = req.params.id
  const numbers = sqids.decode(id)
  const sequence = numbers[0]

  console.log(`id: ${id}, sequence: ${sequence}`)
  res.send(id + ' => ' + numbers + '\n')
});

router.get("/batch/:sequence", (req: Request, res: Response) => {
  let maxSequence: number = Number(req.params.sequence)
  let id: string

  console.log(`start generate sqids : ${maxSequence}`)
  for (let i = 1; i <= maxSequence; i++) {
    id = sqids.encode([i])
    console.log(`sequence: ${i}, id: ${id}`)
  }
  console.log(`finish generate sqids : ${maxSequence}`)
  res.send(`finish generate ${maxSequence} hashids\n`)
});

module.exports = router;
