import express from "express";
import { create, getALL, getOne, update, deleteUser } from "../controller/userController.js";

const router = express.Router();

router.post("/create", create);
router.get("/getall", getALL);
router.get("/getone/:id", getOne);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteUser); // Ensure this route is defined correctly

export default router;
