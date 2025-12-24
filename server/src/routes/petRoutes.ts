import { Router } from 'express';
import {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
} from '../controllers/petController';
import { protect, restrictTo } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllPets);
router.get('/:id', getPetById);

// Protected routes (require authentication)
router.post('/', protect, createPet);
router.put('/:id', protect, updatePet);
router.delete('/:id', protect, deletePet);

export default router;
