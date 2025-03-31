import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const renderSignupPage = (req, res) => {
  res.render('signup');
};

export const handleSignup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body; // Changed username to email
  console.log(`Full Name: ${fullname}, Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}`);

  if (password === confirmPassword) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({ fullname, email, passwordHash }); // Changed username to email
      await newUser.save();

      const token = jwt.sign({ email: newUser.email }, process.env.SECRET_KEY, { expiresIn: '1h' }); // Changed username to email
      res.cookie('authToken', token, { httpOnly: true });
      res.send('Signup successful!');
    } catch (err) {
      console.error('Error saving user:', err);
      res.send('Error during signup. Please try again.');
    }
  } else {
    res.send('Passwords do not match');
  }
};
