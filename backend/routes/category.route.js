import { Router } from "express";
import { createCategory, getCategories } from "../controllers/category.controller.js";
import { validateCategory } from "../validators/categoryValidator.js";

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.post('/', validateCategory, createCategory);

export default categoryRouter;