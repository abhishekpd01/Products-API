import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        let filters = {};
    
        if(category) {
            filters.categoryId = category;
        }
        if(search) {
            filters.title = { contains: search, mode: 'insensitive' }
        } 
    
        const products = await prisma.product.findMany({
            where: filters,
            include: { category: true }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!', error: error });
    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: id },
            include: { category: true }
        });
        if(!product) {
            return res.status(404).json({ error: 'Product not Found!' })
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!', error: error });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { title, description, price, categoryId } = req.body;
        const newProduct = await prisma.product.create({
            data: { title, description, price: parseFloat(price), categoryId }
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!', error: error });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await prisma.product.update({
            where: { id: id },
            data: req.body
        });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!', error: error });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({
            where: { id: id }
        });
        res.json({ message: 'Product deleted Successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!', error: error });
    }
}