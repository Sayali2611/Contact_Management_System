const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('cors');

dotenv.config();

const app = express();

// FIXED CORS CONFIGURATION
app.use(cors({
  origin: '*', // Allow ALL origins
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/contact_app')
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err.message));

// Routes
app.use('/api/contacts', require('./routes/contacts'));

// Test route with JSON response
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Contact Management API is Running!',
    status: 'active',
    timestamp: new Date().toISOString(),
    endpoints: {
      contacts: '/api/contacts'
    }
  });
});

// Catch-all route for testing
app.get('/test', (req, res) => {
  res.json({ test: 'Backend is working!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});