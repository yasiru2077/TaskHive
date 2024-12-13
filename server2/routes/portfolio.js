import express from "express";
import { verifyToken } from "../middleware/authenticated.js";
import {
  createArtWork,
  deleteArtwork,
  getAllArtWork,
  getArtWorks,
  updateArtWork,
} from "../controllers/portfolio.js";

const router = express.Router();

router.post("/", verifyToken, createArtWork);
router.get("/", verifyToken, getArtWorks);
router.put("/:id", verifyToken, updateArtWork);
router.delete("/:id", verifyToken, deleteArtwork);
router.get("/all", verifyToken, getAllArtWork);

export default router;
