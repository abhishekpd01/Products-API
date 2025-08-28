export const validateCategory = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.trim().length < 3) {
    return res.status(400).json({ error: "Category name must be at least 3 characters" });
  }

  next();
};
