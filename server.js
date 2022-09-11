const express = require('express');
const path = require('path');
const authRoute = require('./routes/api/auth');

// const cors = require('cors');
// const enforce = require('express-sslify');

const app = express();

// Init Middleware
// enable ssl redirect
// app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(express.json({ extended: false }));
// app.use(cors());

// Define Route
app.use('/api/auth', authRoute);
// app.use('/api/validate', require('./routes/api/validate'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
