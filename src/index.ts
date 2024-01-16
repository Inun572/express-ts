import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import booksRoutes from './books/routes';
import { logger } from './middlewares';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6969;

app.use(express.json());
app.use(logger);

app.get('/', async (req: Request, res: Response) => {
  res.json({
    message: 'Hello, World! Please use /books to get all books',
  });
});

app.use('/books', booksRoutes);

app.use((req: Request, res: Response) => {
  res.json({ error: 'Not found 🙁, please check your endpoint' });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:3000 🚀`);
});
