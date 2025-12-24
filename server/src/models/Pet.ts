import { Schema, model, Document } from 'mongoose';

export interface IPet extends Document {
  name: string;
  kind: 'dog' | 'cat' | 'bird';
  weight: number;
  height: number;
  length: number;
  number_of_lives?: number; // For cats
  wingspan?: number; // For birds
  num_of_feathers?: number; // For birds
  ownerId?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const petSchema = new Schema<IPet>(
  {
    name: {
      type: String,
      required: [true, 'Pet name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name must not exceed 50 characters'],
    },
    kind: {
      type: String,
      required: [true, 'Pet kind is required'],
      enum: {
        values: ['dog', 'cat', 'bird'],
        message: '{VALUE} is not a valid pet kind',
      },
    },
    weight: {
      type: Number,
      required: [true, 'Weight is required'],
      min: [0.1, 'Weight must be positive'],
    },
    height: {
      type: Number,
      required: [true, 'Height is required'],
      min: [0.1, 'Height must be positive'],
    },
    length: {
      type: Number,
      required: [true, 'Length is required'],
      min: [0.1, 'Length must be positive'],
    },
    number_of_lives: {
      type: Number,
      min: [1, 'Lives must be at least 1'],
      max: [9, 'Lives cannot exceed 9'],
      // Required only for cats - validated in controller
    },
    wingspan: {
      type: Number,
      min: [0.1, 'Wingspan must be positive'],
      // Required only for birds - validated in controller
    },
    num_of_feathers: {
      type: Number,
      min: [1, 'Number of feathers must be at least 1'],
      // Required only for birds - validated in controller
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for search and filtering
petSchema.index({ name: 'text' });
petSchema.index({ kind: 1 });
petSchema.index({ ownerId: 1 });

export const Pet = model<IPet>('Pet', petSchema);
