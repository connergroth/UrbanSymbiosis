import { validateUUID } from '../middleware/validateUUID.js';
import express from 'express';
import supabase from '../lib/supabase.js';

const router = express.Router();

/**
 * GET /bookings
 * Fetch all bookings from Supabase
 */
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('bookings').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error(' Error fetching bookings:', error.message);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

/**
 * GET /bookings/:id
 * Fetch a single booking by ID
 */
router.get('/:id', validateUUID, async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Booking not found' });
    res.json(data);
  } catch (error) {
    console.error(' Error fetching booking by ID:', error.message);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

export default router;