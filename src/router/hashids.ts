// src/router/hashids.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Hashids from 'hashids'

dotenv.config();

const router = express.Router();
const salt = process.env.HASHIDS_SALT || '';
const alphabet = process.env.HASHIDS_ALPHABET || '';
const minLength = parseInt(process.env.HASHIDS_MIN_LENGTH || '');
const hashids = new Hashids(
  /* salt: */ salt,
  /* minLength: */ minLength,
  /* alphabet: */ alphabet,
  /* these chars can't be next to one another: */ '',
);


router.get("/encode/:sequence", (req: Request, res: Response) => {
  const sequence = Number(req.params.sequence)
  const id = hashids.encode([sequence])

  console.log(`sequence: ${sequence}, id: ${id}, length: ${id.length}`) ;
  res.send(sequence + ' => ' + id + '\n');
});

router.get("/decode/:id", (req: Request, res: Response) => {
  const id = req.params.id
  const numbers = hashids.decode(id)
  const sequence = numbers[0]

  console.log(`id: ${id}, sequence: ${sequence}`);
  res.send(id + ' => ' + sequence + '\n');
});

module.exports = router;
