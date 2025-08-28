import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find or create cart for user
    let cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    // Create cart item linked to cart
    const cartItem = await prisma.cartItem.create({
      data: {
        productId,
        quantity,
        cartId: cart.id
      }
    });

    res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add to cart', details: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.query;
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: true }
    });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get cart', details: error.message });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    await prisma.cartItem.delete({
      where: { id: itemId }
    });
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from cart', details: error.message });
  }
};
