import express from "express";
import { fetchQuizDetails, handleQuizGeneration } from "../controller/quiz.js";
import { checkUserAuth } from "../middleware/index.js";
const route = express.Router();

route.post("/generate", checkUserAuth, handleQuizGeneration);
route.get("/fetch-quiz-information/:id", checkUserAuth, fetchQuizDetails);

export default route;
