require('dotenv').config()
const cors = require('cors');
const express = require('express');

const db = require('./models');
const Role = db.role;

const app = express();
const URI = process.env.DB_URI;
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: false }));

// CORS Settings
const allowedOrigins = ['http://localhost:3000', 'mongodb://127.0.0.1:27017', 'http://localhost:8080'];
app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

// Add headers
app.use(express.json());
app.use(express.static('public'));
app.use('/images', express.static('images'));
// app.use(express.static(path.join(__dirname, '../book-app/build')));


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, x-access-token, Origin, Content-Type, Accept");
    // Pass to next layer of middleware
    next();
});

const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to Roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to Roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to Roles collection");
      });
    }
  })
}

db.mongoose
  .connect(URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(process.env.DB_PORT, () => console.log(`Server and Database running on ${process.env.DB_PORT}, http://localhost:${process.env.DB_PORT}`));
    initial();
  })
  .catch((err) => {
    console.log('Connection error: ', err);
    process.exit();
  });

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/book.routes')(app);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));