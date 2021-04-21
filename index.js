const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 5055;

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//Route Middleware
app.use(cors())
app.use(bodyParser.json())
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Connect to DB 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hevee.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, 
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to db')
);




app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
