import { Schema, model, Document, Model, Types, ObjectId } from "mongoose";

interface IBlog extends Document {
	title: string;
	content: string;
	islive: Boolean;
	user: ObjectId;
}

const UserSchema: Schema<IBlog> = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		islive: { type: Boolean, required: true, default: false },
		user: { type: Types.ObjectId, required: true, ref: "users" },
	},
	{ timestamps: true },
);

const Blog: Model<IBlog> = model("blog", UserSchema);

export { Blog, IBlog };
