import { Response } from 'express';
import { Favorite } from '../models/Favorite';
import { Pet } from '../models/Pet';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const getFavorites = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const favorites = await Favorite.find({ userId: req.user?.id })
      .populate('petId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { petId } = req.body;

    // Check if pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      throw new AppError('Pet not found', 404);
    }

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({
      userId: req.user?.id,
      petId,
    });

    if (existingFavorite) {
      throw new AppError('Pet already in favorites', 400);
    }

    const favorite = await Favorite.create({
      userId: req.user?.id,
      petId,
    });

    res.status(201).json({
      success: true,
      data: favorite,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { petId } = req.params;

    const favorite = await Favorite.findOneAndDelete({
      userId: req.user?.id,
      petId,
    });

    if (!favorite) {
      throw new AppError('Favorite not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Favorite removed successfully',
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { petId } = req.params;

    const favorite = await Favorite.findOne({
      userId: req.user?.id,
      petId,
    });

    res.status(200).json({
      success: true,
      isFavorite: !!favorite,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
