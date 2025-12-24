import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Pet } from '../models/Pet';

dotenv.config();

const seedPets = [
  {
    name: 'Buddy',
    kind: 'dog',
    weight: 30,
    height: 60,
    length: 80,
  },
  {
    name: 'Max',
    kind: 'dog',
    weight: 25,
    height: 55,
    length: 75,
  },
  {
    name: 'Whiskers',
    kind: 'cat',
    weight: 5,
    height: 25,
    length: 40,
    number_of_lives: 9,
  },
  {
    name: 'Mittens',
    kind: 'cat',
    weight: 4.5,
    height: 23,
    length: 38,
    number_of_lives: 7,
  },
  {
    name: 'Shadow',
    kind: 'cat',
    weight: 6,
    height: 27,
    length: 42,
    number_of_lives: 8,
  },
  {
    name: 'Tweety',
    kind: 'bird',
    weight: 0.5,
    height: 15,
    length: 12,
    wingspan: 30,
    num_of_feathers: 2000,
  },
  {
    name: 'Blue',
    kind: 'bird',
    weight: 0.8,
    height: 18,
    length: 14,
    wingspan: 35,
    num_of_feathers: 2500,
  },
  {
    name: 'Charlie',
    kind: 'dog',
    weight: 35,
    height: 65,
    length: 85,
  },
  {
    name: 'Luna',
    kind: 'cat',
    weight: 4,
    height: 22,
    length: 36,
    number_of_lives: 9,
  },
  {
    name: 'Rocky',
    kind: 'bird',
    weight: 1.2,
    height: 20,
    length: 16,
    wingspan: 40,
    num_of_feathers: 3000,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-manager');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Pet.deleteMany({});
    console.log('🗑️  Cleared existing pets');

    // Insert seed data
    await Pet.insertMany(seedPets);
    console.log(`✅ Added ${seedPets.length} pets to database`);

    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
