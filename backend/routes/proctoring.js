const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, code } = req.body;
    
    const user = new User({ name, email, code });
    await user.save();
    
    res.send({ message: 'Proctoring data saved successfully.' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
