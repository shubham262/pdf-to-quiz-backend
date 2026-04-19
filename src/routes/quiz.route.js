import express from "express";
import { handleQuizGeneration } from "../controller/quiz.js";
const route = express.Router();

route.post("/generate", handleQuizGeneration);

export default route;
