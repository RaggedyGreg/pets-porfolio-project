import { Request, Response } from 'express';
import { Pet } from '../models/Pet';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const getAllPets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, kind, page = 1, limit = 50 } = req.query;
    
    const query: any = {};
    
    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    // Filter by kind
    if (kind && ['dog', 'cat', 'bird'].includes(kind as string)) {
      query.kind = kind;
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const pets = await Pet.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    
    const total = await Pet.countDocuments(query);

    res.status(200).json({
      success: true,
      count: pets.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: pets,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      throw new AppError('Pet not found', 404);
    }

    res.status(200).json({
      success: true,
      data: pet,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createPet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, kind, weight, height, length, number_of_lives, wingspan, num_of_feathers } = req.body;

    // Validate kind-specific fields
    if (kind === 'cat' && !number_of_lives) {
      throw new AppError('Number of lives is required for cats', 400);
    }
    if (kind === 'bird' && (!wingspan || !num_of_feathers)) {
      throw new AppError('Wingspan and number of feathers are required for birds', 400);
    }

    const petData: any = {
      name,
      kind,
      weight,
      height,
      length,
      ownerId: req.user?.id,
    };

    if (kind === 'cat') petData.number_of_lives = number_of_lives;
    if (kind === 'bird') {
      petData.wingspan = wingspan;
      petData.num_of_feathers = num_of_feathers;
    }

    const pet = await Pet.create(petData);

    res.status(201).json({
      success: true,
      data: pet,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      throw new AppError('Pet not found', 404);
    }

    // Check ownership or admin
    if (
      pet.ownerId?.toString() !== req.user?.id &&
      req.user?.role !== 'admin'
    ) {
      throw new AppError('Not authorized to update this pet', 403);
    }

    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: updatedPet,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      throw new AppError('Pet not found', 404);
    }

    // Check ownership or admin
    if (
      pet.ownerId?.toString() !== req.user?.id &&
      req.user?.role !== 'admin'
    ) {
      throw new AppError('Not authorized to delete this pet', 403);
    }

    await Pet.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Pet deleted successfully',
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
