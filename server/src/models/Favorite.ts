import { Schema, model, Document } from 'mongoose';

export interface IFavorite extends Document {
  userId: Schema.Types.ObjectId;
  petId: Schema.Types.ObjectId;
  createdAt: Date;
}

const favoriteSchema = new Schema<IFavorite>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    petId: {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Composite index to prevent duplicate favorites and speed up queries
favoriteSchema.index({ userId: 1, petId: 1 }, { unique: true });

export const Favorite = model<IFavorite>('Favorite', favoriteSchema);
