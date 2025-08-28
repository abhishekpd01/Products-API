export const validateProduct = (req, res, next) => {
  const { title, description, price, categoryId } = req.body;

  if (!title || !description || !price || !categoryId) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ error: "Price must be a positive number" });
  }

  next();
};
