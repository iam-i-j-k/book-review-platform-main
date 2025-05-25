import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Proxy route for Gutenberg text files
app.get('/api/gutenberg/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const url = `https://www.gutenberg.org/ebooks/${bookId}.txt.utf-8`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch file');
    }
    const text = await response.text();
    res.set('Content-Type', 'text/plain');
    res.send(text);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Use routers
app.use(bookRoutes);
app.use(userRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
