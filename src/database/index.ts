import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.MONGO_URI as string;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('✅ Connected to the database!');
  } catch (error: any) {
    console.log('❌ Database connection error', error);
  }
};

export { connectToDatabase };
