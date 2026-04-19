import { ai } from "../config/gemini.js";
import { PROMPT } from "../helper/index.js";

export const handleQuizGeneration = async (req, res) => {
	try {
		const { file } = req.body || {};
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

		if (result.length) {
			///create Quiz
		}

		console.log("response==>", result);
		return res.status(200).json({
			message: "Successfull",
			data: result,
		});
	} catch (error) {
		console.log("error==>handleQuizGeneration", error);
		res.status(500).json({
			message: "Internal Servor Erorr",
			error,
		});
	}
};
