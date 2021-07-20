import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import connection from "./database.js";

import { signIn, signUp } from "./controllers/userController.js";
import { newTransaction, transactionsList, transactionsSum } from "./controllers/transactionsController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", signUp);

app.post("/sign-in", signIn);

app.post("/financial-events", newTransaction);

app.get("/financial-events", transactionsList);

app.get("/financial-events/sum", transactionsSum);

export default app;
