import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set the views directory and view engine
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index'); // Render 'index.ejs' from the 'views' folder
});


app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log(`Username: ${username}, Password: ${password}`);
  if (username === 'admin' && password === 'admin') {
    res.send('Login successful!');
  }
  else {
    res.send('Invalid credentials');
  }
});


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


app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res) => {
  const { fullname, username, password, confirmPassword } = req.body;
  console.log(`Full Name: ${fullname}, Username: ${username}, Password: ${password}, Confirm Password: ${confirmPassword}`);
  if (password === confirmPassword) {
    res.send('Signup successful!');
  } else {
    res.send('Passwords do not match');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
