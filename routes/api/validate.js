const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const isValidRequest = require('../../utils/isValidRequest');

// @route   POST api/validate
// @desc    validate user's role
// @access  Public
router.post('/', async (req, res) => {
  try {
    const params = {
      access_token: req.headers['x-access-token'],
      scope: req.body.scope,
    };

    const isValidRequestToGetAccessToken = isValidRequest({ ...params });

    if (!isValidRequestToGetAccessToken) {
      return res.status(500).send('Missing params');
    }

    const decoded = jwt.verify(
      req.headers['x-access-token'],
      config.get('jwtSecret')
    );

    if (req.body.scope === decoded.userInfo.scope) {
      res.json({ isPassed: true });
    } else {
      res.json({ isPassed: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
