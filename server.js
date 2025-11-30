const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect DB (safe way)
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing in environment variables!");
}
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/users', require('./routes/users'));

// Only listen if not running in Vercel (Vercel handles this)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;