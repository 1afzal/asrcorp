import mongoose from 'mongoose';

let connecting: Promise<typeof mongoose> | null = null;

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment');
  }
  if (mongoose.connection.readyState === 1) return mongoose;
  if (connecting) return connecting;
  connecting = mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  return connecting;
}
