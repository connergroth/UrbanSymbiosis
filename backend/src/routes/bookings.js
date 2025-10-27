import express from 'express';
import supabase from '../lib/supabase';
// import { authMiddleware } from '../middleware/auth.js'; // TODO: auth to be added later

const router = express.Router();

// GET /bookings - placeholder endpoint
router.get('/', async (req, res) => {
  try {
    // TODO: Fetch bookings from database via Supabase client
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;