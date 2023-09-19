import mongoose from 'mongoose';
import env from '@/utils/env.config';

const dbUrl = env.MONGO_URI || '';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to the database! ✅');
  } catch (error) {
    console.log('Database connection error ❌', error);
  }
};

const disconnectDatabase = async () => {
  await mongoose.disconnect();
};

export { connectToDatabase, disconnectDatabase };
