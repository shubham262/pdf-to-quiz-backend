import express from "express";
import cors from "cors";
import { handleBetterAuth } from "./config/auth.js";
import { toNodeHandler } from "better-auth/node";
import quizRoute from "./routes/quiz.route.js";
const app = express();

const auth = await handleBetterAuth();

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(express.json({ limit: "50mb" }));

app.use("/api/auth", toNodeHandler(auth));
app.use("/api/quiz", quizRoute);

app.listen(3001, () => {
	console.log("Server started at port 3001");
});
