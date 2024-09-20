import express from "express";

import { createJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/createJob").post(createJob);

export default router;
