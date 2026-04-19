import { email } from "better-auth";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export default User = mongoose.model("User", userSchema, "user");
