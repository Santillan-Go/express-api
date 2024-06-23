import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { router } from "./router/route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
