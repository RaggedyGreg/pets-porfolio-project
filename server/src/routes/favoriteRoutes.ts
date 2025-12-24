import { Router } from 'express';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
} from '../controllers/favoriteController';
import { protect } from '../middleware/auth';

const router = Router();

// All favorite routes require authentication
router.use(protect);

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:petId', removeFavorite);
router.get('/check/:petId', checkFavorite);

export default router;
