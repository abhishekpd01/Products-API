# 🛒 E-Commerce API (Node.js + Express + Prisma + MongoDB)

A simple e-commerce backend built with **Node.js**, **Express**, **Prisma ORM**, and **MongoDB**.  
It supports products, categories, and shopping carts.  

---

## 🚀 Features
- Product & Category management  
- Add/remove products to Cart  
- Validation with **Zod**  
- Prisma ORM with MongoDB  
- Ready for deployment (Render/Railway/Vercel)  

---

## 📦 Setup Instructions

### 1. Clone repo
```bash
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a .env file in the root:
```bash
DATABASE_URL="<URL>"
PORT=5000
```

### 4. Prisma setup
```bash
npx prisma generate
```
If you need to push schema changes:
```bash
npx prisma db push
```

### 5. Start server
```bash
npm run dev
```

## 🗄️ Database Schema (Prisma)
```bash
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url = env("DATABASE_URL")
}

model Category {
  id       String    @id @default(auto()) @map("_id") @db.ObjectId
  name     String    @unique
  products Product[]
}

model Product {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  price       Float
  categoryId  String   @db.ObjectId
  category    Category @relation(fields: [categoryId], references: [id])
}

model Cart {
  id     String     @id @default(auto()) @map("_id") @db.ObjectId
  userId String
  items  CartItem[]
}

model CartItem {
  id        String @id @default(auto()) @map("_id") @db.ObjectId
  productId String @db.ObjectId
  quantity  Int
  cartId    String @db.ObjectId
  cart      Cart   @relation(fields: [cartId], references: [id])
}
```

## 📖 API Documentation
### 🔹 Categories
```bash
Create Category
POST /categories
{
  "name": "Electronics"
}

Get All Categories
GET /categories
```

### 🔹 Products
```bash
Create Product
POST /products
{
  "title": "iPhone 15",
  "description": "Latest Apple phone",
  "price": 999.99,
  "categoryId": "<categoryId>"
}

Get All Products
GET /products
```

### 🔹 Cart
```bash
Add to Cart
POST /cart
{
  "userId": "user123",
  "productId": "<productId>",
  "quantity": 2
}


Get User Cart
GET /cart?userId=user123

Remove from Cart
DELETE /cart/:itemId
```

## 🌐 Deployment
### Base URL: https://products-api-nuxo.onrender.com


## 🧑‍💻 Author
### [Abhishek Prasad](https://github.com/abhishekpd01/)
