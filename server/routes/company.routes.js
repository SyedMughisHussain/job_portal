import express from "express";

import {
  createCompany,
  editCompany,
} from "../controllers/companies.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/createCompany").post(upload.single("logo"), createCompany);
router.route("/editCompany/:id").patch(upload.single("logo"), editCompany);

export default router;
