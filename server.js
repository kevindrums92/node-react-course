const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
require('./utils/dateUtils.js');
//Connect DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/events', require('./routes/api/events'));
app.use('/api/riders', require('./routes/api/riders'));
app.use('/api/votes', require('./routes/api/votes'));
app.use('/api/stages', require('./routes/api/stages'));
app.use('/api/ranking', require('./routes/api/ranking'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
