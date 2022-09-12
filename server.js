const express = require('express');
const path = require('path');
const authRoute = require('./routes/api/auth');
const validateRoute = require('./routes/api/validate');
const bodyParser = require('body-parser');
const app = express();

// Init Middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Define Route
app.use('/api/auth', authRoute);
app.use('/api/validate', validateRoute);

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
