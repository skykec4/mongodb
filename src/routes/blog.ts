import { Router } from "express";
import { Blog } from "../models/Blog";

const router = Router();

router.use((req, res, next) => {
	console.log("middleware Time: ", Date.now());
	next();
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
		// const { id } = req.params;
		// const { age } = req.body;
		// // const users = await User.findOneAndUpdate({ id }, { $set: { age } }, { new: true });
		// const blogs: any = await Blog.findOne({ username: id });
		// users.age = age;
		// console.log("users : ", users);
		// await users.save();
		// res.send({ users });
	} catch (error) {
		console.log("error: error");
		res.send({ err: "error", error });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const users = await Blog.findOneAndDelete({ username: id });

		res.send({ users });
	} catch (error) {
		console.log("error: error");
		res.send({ err: "error", error });
	}
});

router.post("/", async (req, res) => {
	try {
		const data = new Blog(req.body);
		await data.save();
		res.send(data);
	} catch (error) {
		console.log(error);
		res.send(`erorr : ${error}`);
	}
});

// module.exports = router
export default router;
