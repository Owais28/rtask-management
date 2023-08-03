const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
// const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;
const morgan = require('morgan')
const verifyAdmin = require('./middleware/verifyAdmin');
const { connectDB } = require('./utils/db');
// const { connectDB } = require('./utils/db')
require('dotenv').config()

connectDB()
// custom middleware logger
app.use(morgan("combined", {}));

//Get the default connection
// var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);

// Cross Origin Resource Sharing
// app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Allow preflight requests for all routes


// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
// app.use('/', require('./routes/root'));
// app.use('/register', require('./routes/register'));
// app.use('/auth', require('./routes/auth'));
// app.use('/refresh', require('./routes/refresh'));
// app.use('/logout', require('./routes/logout'));

app.use('/login', require('./routes/auth'))
app.use('/register', require('./routes/register'))

app.use(verifyJWT);
app.use('/tasks', require('./routes/api/tasks'))

app.use('/user', require('./routes/users'))


app.use('/admin/tasks', verifyAdmin, require('./routes/api/admin'))
// all tasks
// app.use('/tasks/:taskId')         // get a specific task
// app.use('/tasks/:taskId/edit')    // update a task
// app.use('/tasks/:taskId/delete')  // delete a task
// app.use('/admin/dashboard')  // delete a task

// app.use('/employees', require('./routes/api/employees'));


app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ "error": "404 Not Found" });
  } else {
    res.type('txt').send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app