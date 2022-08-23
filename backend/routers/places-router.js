const express = require("express");
const { check } = require("express-validator");

const fileUpload = require("../middleware/file-upload");
const placesControllers = require("../controllers/places-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.get("/:pid", placesControllers.getPlaceById);

router.use(checkAuth); //req without a valid token cannot continue to the next routes

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlaceById
);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
