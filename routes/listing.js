const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require('../models/review.js');
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.renderEditForm));

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));

router.route("/:id")
.get(isLoggedIn, wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroy));

// Delete Route
router
module.exports = router;