const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({ path: 'config.env' });
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const apiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');


// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
//1 - for Categories
app.use('/api/v1/categories', categoryRoute);

//handl wrong routes
app.use('*', (req, res, next) => {
  next( new apiError(`Can't Reach This Route: ${req.originalUrl}`, 400));
});

//global err handler middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server =  app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

//Events => listen => callback(err)
process.on('unhandleRejection', (err) => {
  console.error(`unhandleRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting Down....`);
    process.exit(1);
  });
});
