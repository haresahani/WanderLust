const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listings.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Index & New
router.get("/new", isLoggedIn, listingController.renderNewForm);
router.get("/", listingController.index);

// Create
router.post(
    "/",
    isLoggedIn,
    upload.single("listing[image][url]"),
    validateListing,
    listingController.createListing
);

// Show, Edit, Update, Delete
router.get("/:id", isLoggedIn, listingController.showListing);
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    upload.single("listing[image][url]"),
    validateListing,
    listingController.updateListing
);

router.delete("/:id", isLoggedIn, isOwner, listingController.destroy);

module.exports = router;
 //hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu