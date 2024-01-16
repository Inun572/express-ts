import { Router } from 'express';
import bookHandler from './handler';

const router = Router();

router.get('/', bookHandler.browseBook);
router.get('/:id', bookHandler.getBookById);
router.post('/', bookHandler.postBook);
router.put('/:id', bookHandler.editBookById);
router.delete('/:id', bookHandler.deleteBookById);

export default router;
