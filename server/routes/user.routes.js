import express from 'express';

import { signUp, signIn } from '../controllers/users.controller.js';

import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.route("/signUp").post( upload.single("profile"), signUp);
router.route("/signIn").post(signIn);

export default router;