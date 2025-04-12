<<<<<<< HEAD
=======
import mongoose from "mongoose";
>>>>>>> ce5d6d8af205c401e3116294b573c04110218520
import express from "express";
import { User } from "../models/user.js";
import sharp from "sharp";
import multer from "multer";
import { auth } from "../middleware/auth.js";
const router = new express.Router();

const upload = multer({
  limits: { fileSize: 3000000 },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return callback(new Error("File must be an image"));
    }
    callback(undefined, true);
  },
});

router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
<<<<<<< HEAD
    console.log(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ token });
=======
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
>>>>>>> ce5d6d8af205c401e3116294b573c04110218520
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
<<<<<<< HEAD
    res.send({ token });
=======
    res.send({ user, token });
>>>>>>> ce5d6d8af205c401e3116294b573c04110218520
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/user/me", auth, (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "credit"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Operation" });
  }
  try {
    const user = await req.user;
    updates.forEach(async (update) => {
      if (update === "avatar") {
        const buffer = await sharp(req.file.buffer)
          .resize({ width: 250, height: 250 })
          .png()
          .toBuffer();
        req.user.avatar = buffer;
      }
      req.user[update] = req.body[update];
    });
    await req.user.save();

<<<<<<< HEAD
    res.status(200).send();
=======
    res.send(req.user);
>>>>>>> ce5d6d8af205c401e3116294b573c04110218520
  } catch (e) {
    res.status(500).send(e);
  }
});

//upload avatar
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
<<<<<<< HEAD
export default router;
=======
>>>>>>> ce5d6d8af205c401e3116294b573c04110218520
