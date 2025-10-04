const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    // console.log(allListings);
    res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })
    .populate("owner");
    if (!listing) {
        req.flash("error", "Oops! That listing doesn’t exist anymore.");
        return res.redirect("/listings");
    }
    console.log(listing)
    res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req, res) => {
    let filename = req.file.filename;
    let url = req.file.path;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();

    req.flash("success", "Your listing was created successfully!");
    res.redirect(`/listings/${newListing._id}`);
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Oops! That listing doesn’t exist anymore.");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/,w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    
    if(typeof req.file !== "undefined") {
        let filename = req.file.filename;
        let url = req.file.path;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroy = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        req.flash("error", "Oops! That listing doesn’t exist anymore.");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
}