import express from "express";

import {
  createCompany,
  editCompany,
  getAllCompany,
} from "../controllers/companies.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/getAllCompanies").get(getAllCompany);
router.route("/createCompany").post(upload.single("logo"), createCompany);
router.route("/editCompany/:id").patch(upload.single("logo"), editCompany);

export default router;
