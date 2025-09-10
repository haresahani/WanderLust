const express = require("express");
const router = express.Router({mergeParams : true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require('../models/review.js');

//Validate Joi for Reviews
const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

//Reviews
//POST route
router.post("/", validateReview, wrapAsync(async(req, res) => {
    let { id } = req.params;
   let listing = await Listing.findById(req.params.id);
   let newReview = new Review(req.body.review);

   listing.reviews.push(newReview);

   await listing.save();
   await newReview.save();
   await Listing.findByIdAndUpdate(id, { ...req.body.listing });

   console.log("New review was saved");
   console.log(newReview);
   eq.flash("success", "Review Created!");
   res.redirect(`/listings/${id}`);
}));

//Delete Review Route
router.delete("/:reviewId", wrapAsync(async(req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
   let deleted = await Review.findByIdAndDelete(reviewId);
   console.log(deleted)
   eq.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;