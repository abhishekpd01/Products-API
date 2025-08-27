import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cart = await prisma.cart.findFirst({ where: { userId } });
        if(!cart) {
            cart = await prisma.cart.create({ data: { userId, items: [] } });
        }
    
        const updatedCart = await prisma.cart.update({
          where: { id: cart.id },
          data: {
            items: { push: { productId, quantity } }
          }
        });
        res.status(201).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add to cart', error: error });
    }
}

export const getCart = async (req, res) => {
    try {
        const { userId } = req.query;
        const cart = await prisma.cart.findFirst({ where: { userId } });
        if (!cart) return res.json({ items: [] });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load to cart' });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { userId } = req.query;
        const { itemId } = req.params;
    
        const cart = await prisma.cart.findFirst({ where: { userId } });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
    
        const updatedItems = cart.items.filter(i => i.id !== itemId);
    
        const updatedCart = await prisma.cart.update({
          where: { id: cart.id },
          data: { items: updatedItems }
        });
    
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove from cart' });
    }
}