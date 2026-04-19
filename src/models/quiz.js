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
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);
const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
