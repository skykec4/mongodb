import { Schema, model, Document, Model } from "mongoose";

interface IUser extends Document {
	username: string;
	user: Object;
	age: number;
	email: string;
}

const UserSchema: Schema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		user: {
			first: { type: String, required: true },
			last: { type: String, required: true },
		},
		age: Number,
		email: String,
	},
	{ timestamps: true },
);

const User: Model<IUser> = model("users", UserSchema);

export { User, IUser };
