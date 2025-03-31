import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { renderSignupPage, handleSignup } from './controllers/signupController.js';
import { renderLoginPage, handleLogin } from './controllers/loginController.js';
import { verifyToken } from './middlewares/authMiddleware.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Set the views directory and view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index'); // Render 'index.ejs' from the 'views' folder
});

app.get('/login', renderLoginPage);

app.post('/login', handleLogin);

app.get('/forgot-password', (req, res) => {
  res.render('forgot-password'); // Render the improved forgot-password.ejs
});

app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  if (email) {
    res.send('Password reset link sent to your email!');
  } else {
    res.send('Please provide a valid email address');
  }
  console.log(`Email: ${email}`);
});

app.get('/signup', renderSignupPage);

app.post('/signup', handleSignup);

// Example of a protected route
app.get('/dashboard', verifyToken, (req, res) => {
  res.send(`Welcome to your dashboard, ${req.user.username}!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
