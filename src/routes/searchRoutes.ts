import { Router } from "express";
import { getSearchResult } from "../controllers/searchController";

const router = Router();

router.get("/", getSearchResult);

export default router;
