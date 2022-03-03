import { Router } from "express";
import { Blog } from "../models/Blog";
import { User } from "../models/User";
import { validCheck } from "../utils/validation";

const router = Router();

router.use((req, res, next) => {
	console.log("blog middle ware : ", Date.now());
	next();
});

router.post("/", async (req, res) => {
	try {
		const params = req.body;

		const _validCheck = validCheck("blog", params);

		if (_validCheck !== "") {
			res.send(_validCheck);
			return;
		}
		const user = await User.findById(params.user);
		if (!user) {
			res.send("user does not exist");
			return;
		}

		const blog = new Blog({ ...params, user });
		await blog.save();

		res.send({ blog });
	} catch (error) {
		console.log(error);
		res.send(`erorr : ${error}`);
	}
});

router.get("/", async (req, res) => {
	try {
		const users = await Blog.find({});

		res.send({ users });
	} catch (error) {
		console.log("error: error");
		res.send({ err: "error", error });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const users = await Blog.findOne({ username: id });

		res.send({ users });
	} catch (error) {
		console.log("error: error");
		res.send({ err: "error", error });
	}
});

router.put("/:id", async (req, res) => {
	try {
		/*
		 * params
		 * title
		 * content
		 */
		const params = req.body;

		const _validCheck = validCheck("blog/put", params);

		if (_validCheck !== "") {
			res.send(_validCheck);
			return;
		}

		const updateBlog = await Blog.findByIdAndUpdate(req.params.id, params, { new: true });

		res.send({ updateBlog });
	} catch (error) {
		console.log("error : ", error);
		res.send({ err: "error", error });
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const updateBlog = await Blog.findByIdAndUpdate(req.params.id, { islive: true }, { new: true });

		res.send({ updateBlog });
	} catch (error) {
		console.log("error : ", error);
		res.send({ err: "error", error });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const users = await Blog.findByIdAndDelete(req.params.id);

		res.send({ users });
	} catch (error) {
		console.log("error: error");
		res.send({ err: "error", error });
	}
});

// module.exports = router
export default router;
