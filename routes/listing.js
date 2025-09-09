const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema} = require("../schema.js");
const Review = require('../models/review.js');

//Validate Joi for Listings
const validateListing = (req, res, next) => {
    console.log('req.body:', req.body); // Debug log
    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ExpressError(400, 'Request body is missing'));
    }
    if (!req.body.listing) {
        return next(new ExpressError(400, '"listing" object is required'));
    }
    const { error } = listingSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", ");
        return next(new ExpressError(400, errMsg));
    }
    next();
};

//Index Route
router.get("/", wrapAsync(async (req, res) => {
    let allListings = await Listing.find({});
    // console.log(allListings);
    res.render("listings/index.ejs", { allListings });
}));

//New Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    // console.log(listing);
    res.render("listings/show.ejs", { listing });
}));

// Create Route
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));


//Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    console.log("Edit Route listing:", listing);
    res.render("listings/edit.ejs", { listing });
}));

//Update Route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

//Delet Route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

module.exports = router;