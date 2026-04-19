import mongoose, { Schema } from "mongoose";

const quizSchema = new mongoose.Schema(
	{
		question: {
			type: Schema.Types.Mixed,
			required: true,
		},
		userResponse: {
			type: Schema.Types.Mixed,
			required: false,
			default: {},
		},
		createdBy: {
			ref: "user",
		},
	},
	{ timestamps: true }
);
export default Quiz = mongoose.model("Quiz", quizSchema);
