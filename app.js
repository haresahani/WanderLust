const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require('method-override');
const engine = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require('./utils/ExpressError.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine("ejs", engine);

main()
    .then((res) => {
        console.log("connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
};

app.get("/", (req, res) => {
    res.send("Hi, I'm root")
});

// app.get("/testlisting", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "Sample Listing",
//         description: "Hey there, Please visit our place",
//         price: 8000,
//         location: "Mohali",
//         Country: "India"
//     })
//     await sampleListing.save();
//     console.log(sampleListing);
//     res.send("successfully listed");
// })


//Index Route
app.get("/listings", wrapAsync(async (req, res) => {
    let allListings = await Listing.find({});
    // console.log(allListings);
    res.render("listings/index.ejs", { allListings });
}));

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    // console.log(listing);
    res.render("listings/show.ejs", { listing });
}));

// Create Route
app.post("/listings", wrapAsync(async (req, res, next) => {
    if(!req.body.listing) {
        throw new ExpressError(400, "Send valid date for listing");
    }
    let allListings = new Listing(req.body.listing);
    await allListings.save();
    res.redirect("/listings");
}));

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    console.log("Edit Route listing:", listing);
    res.render("listings/edit.ejs", { listing });
}));

//Update Route
app.put("/listings/:id", wrapAsync(async (req, res) => {
    if(!req.body.listing) {
        throw new ExpressError(400, "Send valid date for listing");
    }
    let { id } = req.params;
    const edit = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    // console.log(edit);
    res.redirect(`/listings/${id}`);
}));

//Delet Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// app.all("*", (req, res, next) =>{
//     next(new ExpressError(404, "Page Not Found!"));
// });

app.use((err, req, res, next) => {
    let {statusCode= 500, message = "Something went wrong"} = err;
    res.status(statusCode).send(message);
})

app.listen(8080, (req, res) => {
    console.log("app is running to port 8080")
});