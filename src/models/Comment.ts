import { Schema, model, Document, Model, Types, ObjectId } from "mongoose";

interface IComment extends Document {
	content: string;
	user: ObjectId;
	blog: ObjectId;
}

const CommentSchema: Schema<IComment> = new Schema(
	{
		content: { type: String, required: true },
		user: { type: Types.ObjectId, required: true, ref: "user" },
		blog: { type: Types.ObjectId, required: true, ref: "blog" },
	},
	{ timestamps: true },
);

const Comment: Model<IComment> = model("comment", CommentSchema);

export { Comment, IComment };
