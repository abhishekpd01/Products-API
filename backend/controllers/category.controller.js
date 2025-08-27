import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: { products: true }
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load categories', error: error });
    }
}

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if(!name) return res.status(400).json({ message: "Name is required" });
    
        const newCategory = await prisma.category.create({
            data: { name }
        });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
}