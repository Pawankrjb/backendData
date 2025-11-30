const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();

// ✅ Connect DB (safe way)
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running on Vercel ✅");
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/users', require('./routes/users'));

// ❌ app.listen REMOVE
module.exports = app;