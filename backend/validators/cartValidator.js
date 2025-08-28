export const validateCart = (req, res, next) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: "userId, productId, and quantity are required" });
  }
  if (typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({ error: "Quantity must be a positive number" });
  }

  next();
};
