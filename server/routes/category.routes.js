import express from "express";

import {
  createCategory,
  getAllCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.route("/getAllCategories").get(getAllCategory);
router.route("/createCategory").post(createCategory);

export default router;
