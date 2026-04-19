import { ai } from "../config/gemini.js";
import { PROMPT } from "../helper/index.js";
import db from "../models/index.js";
const { User, Quiz } = db;

export const handleQuizGeneration = async (req, res) => {
	try {
		const { file } = req.body || {};
		const user = req.user;
		const userId = user.id;
		if (!file) {
			return res.status(400).json({
				message: "File is required",
			});
		}
		const contents = [
			{ text: PROMPT },
			{
				inlineData: {
					mimeType: "application/pdf",
					data: file,
				},
			},
		];

		const response = await ai.models.generateContent({
			model: "gemini-3-flash-preview",
			contents: contents,
		});
		let text = response?.text;
		text = text
			.replace(/```json/g, "")
			.replace(/```/g, "")
			.trim();
		let result;
		try {
			result = JSON.parse(text);
		} catch (error) {
			result = {};
		}

		if (!result.length) {
			return res.status(400).json({
				message: "Please try again",
			});
		}

		const quizData = await Quiz.create({
			question: result,
			createdBy: userId,
		});

		return res.status(200).json({
			message: "Quiz created Successfully",
			data: quizData,
		});
	} catch (error) {
		console.log("error==>handleQuizGeneration", error);
		res.status(500).json({
			message: "Internal Servor Erorr",
			error,
		});
	}
};

export const handleSaveQuizResponse = async (req, res) => {
	try {
		const { id } = req.params || {};
		const { userResponse } = req.body || {};
		if (!id || !userResponse) {
			return res.status(400).json({
				message: "Quiz Id and userResponse is required",
			});
		}

		const results = await Quiz.findByIdAndUpdate(
			id,
			{ userResponse },
			{ returnDocument: "after" }
		);

		return res.status(200).json({
			message: "Quiz created Successfully",
			data: results,
		});
	} catch (error) {
		console.log("error==>handleSaveQuizResponse", error);
		res.status(500).json({
			message: "Internal Servor Erorr",
			error,
		});
	}
};

export const fetchQuizDetails = async (req, res) => {
	try {
		const { id } = req.params || {};
		if (!id) {
			return res.status(400).json({
				message: "Quiz Id is required",
			});
		}
		const quiz = await Quiz.findById(id);

		return res.status(200).json({
			message: "Quiz fetched Successfully",
			data: quiz,
		});
	} catch (error) {
		console.log("error==>fetchQuizDetails", error);
		res.status(500).json({
			message: "Internal Servor Erorr",
			error,
		});
	}
};
