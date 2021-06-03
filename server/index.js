const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const morgan = require('morgan');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const kill = require('kill-port');
const { killPortProcess } = require('kill-port-process');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));
app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));

require('dotenv').config();

//console.log(`uri1 > ${process.env.MONGO_DB_URI}`);
//console.log(`uri2 > ${config.mongoURI}`)

const connect = mongoose.connect(process.env.MONGO_DB_URI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors());

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
//app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
//app.use(bodyParser.json());
//app.use(cookieParser());




//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client


// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  }); 
}

const port = process.env.PORT || 5054;
/*
(async () => {
  await killPortProcess(port); // takes a number, number[], string or string[]
  //await killPortProcess(5055); // takes a number, number[], string or string[]
})();
*/
/*
(async () => {
  try {
    await kill(port, 'tcp');
  } catch(err) {
    console.error(err);
  }
  app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
  });
})();
*/
app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});