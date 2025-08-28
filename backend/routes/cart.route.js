import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";
import { validateCart } from "../validators/cartValidator.js";

const cartRouter = Router();

cartRouter.post('/', validateCart, addToCart);
cartRouter.get('/', getCart);
cartRouter.delete('/:itemId', removeFromCart);

export default cartRouter;