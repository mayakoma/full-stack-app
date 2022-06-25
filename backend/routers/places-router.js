const express = require("express");

const HttpError = require("../models/http-error");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  console.log("Get Req in Places");
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for a provided id", 404);
  }
  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  console.log("Get Req in Users");
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((u) => {
    return u.creator === userId;
  });
  if (!place) {
    return next(
      new HttpError("Could not find a place for a provided user id", 404)
    );
  }
  res.json({ place });
});

module.exports = router;
