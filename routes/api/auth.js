const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const isValidRequest = require('../../utils/isValidRequest');

// @route   GET api/auth
// @desc    Get access_token
// @access  Public
router.post('/', async (req, res) => {
  try {
    const params = {
    'x-correlationid': req.headers['x-correlationid'],
      userInfo: {
        ...req.body.userInfo,
        scope: req.body.scope,
      },
    };
    console.log(req.headers)
    const isValidRequestToGetAccessToken = isValidRequest({ ...params });

    if (!isValidRequestToGetAccessToken) {
      return res.status(500).send('Missing params');
    }

    const payload = {
      userInfo: {
        ...req.body.userInfo,
        scope: req.body.scope,
      },
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
