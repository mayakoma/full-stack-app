const express = require("express");
const bodyParser = require("body-parser");
const placesRouter = require("./routers/places-router");
const usersRouter = require("./routers/users-routers");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRouter);

app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  const error = new HttpError("Cold  not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000, () => {
  console.log("listen port 5000");
});
