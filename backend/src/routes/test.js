const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/health', async (req, res) => {
  try {
    // Test database connection
    await User.sequelize.authenticate();
    res.json({ 
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;