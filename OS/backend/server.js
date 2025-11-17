import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'; //development only
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());  // <- CRITICAL to parse POST body

app.use(cors({
  origin: '*',          // Allow all origins during development
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type'
}));

// Supabase clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// POST login route
app.post('/auth/loginOs', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in:', error.message);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('Login successful:', data);

    return res.status(200).json({
      message: 'Login successful',
      user: data.user,
      session: data.session  // ← important for calling protected routes
    });

  } catch (err) {
    console.error('Unexpected login error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
