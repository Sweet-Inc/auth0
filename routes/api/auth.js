const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

// @route   GET api/admin/login
// @desc    Login admin
// @access  Public
router.get('/', async (_, res) => {
  try {
    const payload = {
      user: '1',
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ access_token: token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
