import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post('/', addToCart);
cartRouter.get('/', getCart);
cartRouter.delete('/', removeFromCart);

export default cartRouter;