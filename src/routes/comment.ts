import { Router } from "express";
import { Comment } from "../models/Comment";
// import { User } from "../models/c";
// import { validCheck } from "../utils/validation";

const router = Router({ mergeParams: true });

router.post("/", async (req, res) => {
	try {
		// const params = req.body;
		// const _validCheck = validCheck("blog", params);
		// if (_validCheck !== "") {
		// 	res.send(_validCheck);
		// 	return;
		// }
		// const user = await User.findById(params.user);
		// if (!user) {
		// 	res.send("user does not exist");
		// 	return;
		// }
		// const blog = new Blog({ ...params, user });
		// await blog.save();
		// res.send({ blog });
	} catch (error) {
		console.log(error);
		res.send(`erorr : ${error}`);
	}
});

router.get("/", async (req, res) => {
	try {
		// const users = await Blog.find({});
		// res.send({ users });
	} catch (error) {
		console.log("error: error");
		res.send({ err: "error", error });
	}
});

export default router;
