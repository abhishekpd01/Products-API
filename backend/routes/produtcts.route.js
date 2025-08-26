import { Router } from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products.controller.js';

const productRouter = Router();

productRouter.get('/', getProduct);
productRouter.get('/:id', getProducts);
productRouter.post('/', createProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;