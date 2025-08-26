import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import productRouter from './routes/produtcts.route.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ message: 'Welcome to Ecommerce API' });
})

app.use('/products', productRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is up and running on port 🏃 ${PORT}`));