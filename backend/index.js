require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool } = require('./config/db');
const userRoutes = require('./routes/User');
const authRoutes = require('./routes/authRoutes');
const eventsRoutes = require('./routes/events');
const protectedRoutes = require('./routes/protectedRoutes');
const skillsRoutes = require('./routes/skills');
const volunteerEventRoutes = require('./routes/volunteerEvents');
const organizerApplications = require('./routes/organizerApplications');
const statsRoutes = require('./routes/statsRoutes');
const recommendationRoutes = require('./routes/recommendations');
const volunteerSearch= require('./routes/volunteerSearch');


const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:3000',  
  credentials: true,                
};
app.use(cors(corsOptions));

app.use(express.json());

const profileRoutes = require('./routes/profile');


app.use((req, res, next) => {
  req.on('close', () => {
    if (!res.writableEnded) {
      console.log('Request aborted by the client');
      req.aborted = true; 
    }
  });
  next();
});


// Routes
app.use('/user',userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api', protectedRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/volunteers', volunteerEventRoutes);
app.use('/api/organizer', organizerApplications);
app.use('/api/stats', statsRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/volunteers', volunteerSearch);


pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
  console.log('✅ Connected to database');
  connection.release();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  
  if (!res.headersSent) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
