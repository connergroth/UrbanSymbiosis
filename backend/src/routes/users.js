import express from 'express';
import supabase from '../lib/supabase.js';

const router = express.Router();

/**
 * GET /users
 * Fetch all users from Supabase
 */
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error(' Error fetching users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

/**
 * GET /users/:id
 * Fetch a single user by ID
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'User not found' });
    res.json(data);
  } catch (error) {
    console.error(' Error fetching user by ID:', error.message);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

export default router;