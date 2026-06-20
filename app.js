const express = require('express');
const cors = require('cors');

const ApiError = require('./app/api-error');

const app = express();

const contactRoutes = require('./app/routes/contact.route');

app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Contact Book application.' });
});

app.use("/api/contacts", contactRoutes);

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;