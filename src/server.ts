import express, { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { connect, set } from "mongoose";
import process from "process";

import user from "./routes/user";

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI =
	"mongodb+srv://admin:qwer123434@cluster0.zcf94.mongodb.net/blogService?retryWrites=true&w=majority";

const startServer = async () => {
	try {
		await connect(MONGODB_URI);
		set("debug", true);
		console.log("connection mongodb success");

		app.use(express.json());

		app.use("/user", user);

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
