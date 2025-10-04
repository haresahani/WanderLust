// const Listing = require("../models/listing");

// // Show all listings
// module.exports.index = async (req, res) => {
//     try {
//         const allListings = await Listing.find({});
//         res.render("listings/index.ejs", { allListings });
//     } catch (err) {
//         console.error(err);
//         req.flash("error", "Unable to fetch listings");
//         res.redirect("/");
//     }
// };

// // Render form to create new listing
// module.exports.renderNewForm = (req, res) => {
//     res.render("listings/new.ejs");
// };

// // Show single listing
// module.exports.showListing = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const listing = await Listing.findById(id)
//             .populate({
//                 path: "reviews",
//                 populate: { path: "author" },
//             })
//             .populate("owner");

//         if (!listing) {
//             req.flash("error", "Oops! That listing doesn’t exist anymore.");
//             return res.redirect("/listings");
//         }

//         res.render("listings/show.ejs", { listing });
//     } catch (err) {
//         console.error(err);
//         req.flash("error", "Error fetching listing");
//         res.redirect("/listings");
//     }
// };

// // Create a new listing
// module.exports.createListing = async (req, res) => {
//     try {
//         const newListing = new Listing(req.body.listing);
//         newListing.owner = req.user._id;

//         if (req.file) {
//             const { filename, path: url } = req.file;
//             newListing.image = { url, filename };
//         } else {
//             newListing.image = {
//                 url: "/images/placeholder.jpg",
//                 filename: "placeholder",
//             };
//         }

//         await newListing.save();
//         req.flash("success", "Your listing was created successfully!");
//         res.redirect(`/listings/${newListing._id}`);
//     } catch (err) {
//         console.error(err);
//         req.flash("error", "Error creating listing");
//         res.redirect("/listings");
//     }
// };

// // Render edit form
// module.exports.renderEditForm = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const listing = await Listing.findById(id);
//         if (!listing) {
//             req.flash("error", "Oops! That listing doesn’t exist anymore.");
//             return res.redirect("/listings");
//         }

//         let originalImageUrl = listing.image?.url || "/images/placeholder.jpg";
//         originalImageUrl = originalImageUrl.replace("/upload", "/upload/,w_250");
//         res.render("listings/edit.ejs", { listing, originalImageUrl });
//     } catch (err) {
//         console.error(err);
//         req.flash("error", "Error loading edit form");
//         res.redirect("/listings");
//     }
// };

// // Update listing
// module.exports.updateListing = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

//         if (req.file) {
//             const { filename, path: url } = req.file;
//             listing.image = { url, filename };
//             await listing.save();
//         }

//         req.flash("success", "Listing updated successfully!");
//         res.redirect(`/listings/${id}`);
//     } catch (err) {
//         console.error(err);
//         req.flash("error", "Error updating listing");
//         res.redirect("/listings");
//     }
// };

// // Delete listing
// module.exports.destroy = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedListing = await Listing.findByIdAndDelete(id);
//         if (!deletedListing) {
//             req.flash("error", "Oops! That listing doesn’t exist anymore.");
//             return res.redirect("/listings");
//         }
//         req.flash("success", "Listing deleted successfully!");
//         res.redirect("/listings");
//     } catch (err) {
//         console.error(err);
//         req.flash("error", "Error deleting listing");
//         res.redirect("/listings");
//     }
// };
 