import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

export const renderLoginPage = (req, res) => {
  res.render('login');
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(`Email: ${email}, Password: ${password}`);

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.send('Invalid credentials');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.send('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true });

    // Redirect to home page
    res.redirect('/');
  } catch (err) {
    console.error('Error during login:', err);
    res.send('An error occurred. Please try again.');
  }
};
