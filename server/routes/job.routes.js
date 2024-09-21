import express from "express";

import {
  createJob,
  getAllJobs,
  editJob,
  applicant
} from "../controllers/job.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/getAllJobs").get(getAllJobs);
router.route("/createJob").post(authMiddleware, createJob);
router.route("/editJob/:id").patch(authMiddleware, editJob);
router.route("/applicant/:id").patch(authMiddleware, applicant);


export default router;
