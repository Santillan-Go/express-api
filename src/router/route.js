import { Router } from "express";
import {
  createlends,
  createusers,
  getLends,
  paylends,
} from "../Controller/controllerPays.js";

export const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hola mundo",
  });
});
router.get("/user/getlends/:name", getLends);

router.post("/user/create", createusers);

router.post("/user/lends", createlends);

router.post("/user/pays", paylends);
