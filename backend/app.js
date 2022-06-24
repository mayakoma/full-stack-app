const express = require("express");
const bodyParser = require("body-parser");
const placesRouter = require("./routers/places-router");

const app = express();
app.use(placesRouter);

app.listen(5000, () => {
  console.log("listen port 5000");
});
