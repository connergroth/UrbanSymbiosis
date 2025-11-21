import express from 'express';
import supabase from '../lib/supabase.js';
import { validateBody, bookingSchema } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateBody(bookingSchema), async (req, res) => {
  res.json({ message: "Booking validated successfully (placeholder)" });
});


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
router.get('/:id', async (req, res) => {
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