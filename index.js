const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors')
const path = require('path');

const bodyparser = require('body-parser')

require('./src/repositories/database');

const passportSetup = require('./src/utils/passport-config')
app.use(express.json({ limit: '50mb' }));;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors({
  origin: "*" ,
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true
}))

app.use(function (req, res, next) {
  
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,set-cookie');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

let PORT = process.env.PORT || 3000;

const { index } = require('./src/routes/index');
index(app);

app.all('*', (req, res) => {
    res.status(404).json({
      status: false,
      error: 'You Completely Lost Your Way 😈',
    });
  });


app.listen(PORT, () => {
    console.log(`
  Server is running on port ${PORT}
  http://localhost:${PORT}
  `);
  });