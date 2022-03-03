import { Router } from "express";
import { User } from "../models/User";
import { Schema } from "mongoose";

const router = Router();
// middleware that is specific to this router
router.use((req, res, next) => {
	console.log("middleware Time: ", Date.now());
	next();
});
router.get("/test", async (req, res, next) => {
	try {
		throw "test error";
		const users = await User.find({});

		res.send({ users });
	} catch (error) {
		console.log("error: error");
		next(error);
	}
});

router.get("/", async (req, res) => {
	try {
		const users = await User.find({});

		res.send({ users });
	} catch (error) {
		console.log("error: error");
		res.send({ err: "error", error });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const users = await User.findOne({ username: id });

		res.send({ users });
	} catch (error) {
		console.log("error: error");
		res.send({ err: "error", error });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { age } = req.body;

		// const users = await User.findOneAndUpdate({ id }, { $set: { age } }, { new: true });

		const users: any = await User.findOne({ username: id });

		users.age = age;

		console.log("users : ", users);
		await users.save();

		res.send({ users });
	} catch (error) {
		console.log("error: error");
		res.send({ err: "error", error });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const users = await User.findOneAndDelete({ username: id });

		res.send({ users });
	} catch (error) {
		console.log("error: error");
		res.send({ err: "error", error });
	}
});

router.post("/", async (req, res) => {
	try {
		const data = new User(req.body);
		await data.save();
		res.send(data);
	} catch (error) {
		console.log(error);
		res.send(`erorr : ${error}`);
	}
});

// module.exports = router
export default router;
