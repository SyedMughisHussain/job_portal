import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/connectDB.js";

import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import jobRoutes from "./routes/job.routes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/job", jobRoutes);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    console.log("Database Connected Successfully!");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
