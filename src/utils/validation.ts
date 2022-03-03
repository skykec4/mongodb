import { IBlog } from "../models/Blog";
import { isValidObjectId } from "mongoose";

const validCheck = (type: string, params: IBlog): string => {
	let errorMessage = "";
	if (type === "blog") {
		if (!params.title) {
			errorMessage = "title is required";
		} else if (typeof params.title !== "string") {
			errorMessage = "title type is not string";
		} else if (!params.content) {
			errorMessage = "content is required";
		} else if (typeof params.title !== "string") {
			errorMessage = "content type is not string";
		} else if (params.islive && typeof params.islive !== "boolean") {
			errorMessage = "content type is not string";
		} else if (!isValidObjectId(params.user)) {
			errorMessage = "userid is invalid";
		}

		return errorMessage;
	} else if (type === "blog/put") {
		if (!params.title) {
			errorMessage = "title is required";
		} else if (typeof params.title !== "string") {
			errorMessage = "title type is not string";
		} else if (!params.content) {
			errorMessage = "content is required";
		} else if (typeof params.title !== "string") {
			errorMessage = "content type is not string";
		}

		return errorMessage;
	} else {
		return "type is undefined";
	}
};

export { validCheck };
