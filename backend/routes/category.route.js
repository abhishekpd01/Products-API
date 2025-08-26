import { Router } from "express";
import { createCategory, getCategories } from "../controllers/category.contoller.js";

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.post('/', createCategory);

export default categoryRouter;