import { Request, Response } from 'express';
import books, { IBook } from './data';

const bookHandler = {
  browseBook: (req: Request, res: Response) => {
    try {
      const { title } = req.query;

      if (!title) {
        return res.json({
          data: books,
        });
      }

      const stringTitle: string = String(req.query.title).toLowerCase();
      const filteredBooks = books?.filter((book) =>
        book.title.toLowerCase().includes(stringTitle)
      );

      if (filteredBooks.length === 0) {
        return res.json({
          message: 'No books found',
        });
      }

      res.json({
        data: filteredBooks,
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
  getBookById: (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      const book = books.find((book) => book.id === Number(bookId));
      if (!book) {
        return res.json({
          message: 'Book not found',
        });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
  postBook: (req: Request, res: Response) => {
    try {
      const book = req.body;
      const newBook: IBook = { id: books.length + 1, ...book };
      books.push(newBook);
      res.status(201).json({
        message: 'Book added',
        data: books,
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
  editBookById: (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      const bookIndex = books.findIndex((book) => book.id === Number(bookId));

      if (bookIndex === -1) {
        return res.status(404).json({
          message: 'Book not found',
        });
      }
      const updatedBook = { ...books[bookIndex], ...req.body };
      books[bookIndex] = updatedBook;

      res.json({
        message: 'Book updated',
        data: updatedBook,
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
  deleteBookById: (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      const bookIndex = books.findIndex((book) => book.id === Number(bookId));

      if (bookIndex === -1) {
        return res.status(404).json({
          error: 'Book not found',
        });
      }
      books.splice(bookIndex, 1);
      res.json({
        message: 'Book deleted',
        data: books,
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
};

export default bookHandler;
