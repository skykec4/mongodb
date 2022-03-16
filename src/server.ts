import express, { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { connect, set } from "mongoose";
import process from "process";

import userRoute from "./routes/user";
import blogRoute from "./routes/blog";
import commentRoute from "./routes/comment";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const DATABASE = "blogService";
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.zcf94.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
console.log("process.env.MONGODB_USER : ", process.env.MONGODB_USER);
const startServer = async () => {
	try {
		await connect(MONGODB_URI);
		set("debug", true);
		console.log("connection mongodb success");

		app.use(express.json());

		app.use("/user", userRoute);
		app.use("/blog", blogRoute);

		app.use(handleError);

		app.listen(port, () => {
			// eslint-disable-next-line no-console
			console.log(`Example app listening on port ${port}`);
		});
	} catch (error) {
		console.log("start server error : ", { error });
	}
};

const handleError = (
	error: ErrorRequestHandler,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.log("last error : ", error);

	res.send("last !! " + error);
};

startServer();
