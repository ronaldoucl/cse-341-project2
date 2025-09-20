const express = require("express");
const mongodb = require("./data/database.js");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/', require('./routes'));

app.use((err, req, res, next) => {
  console.error("Global error handler:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

mongodb.initDb((err) => {
    if(err) {
        console.error("Error connecting to DB:", err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node Running on port ${port}`)
        })
    }
});

