const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require('method-override');
const engine = require("ejs-mate");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

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
app.get("/listings", async (req, res) => {
    let allListings = await Listing.find({});
    // console.log(allListings);
    res.render("listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    // console.log(listing);
    res.render("listings/show.ejs", { listing });
});

// Create Route
app.post("/listings", async (req, res) => {
    try {
        let allListings = new Listing(req.body.listing);
        await allListings.save();
        res.redirect("/listings");
    } catch(e) {
        console.log("Validation Error:", err.message);
        res.status(400).send("Validation Failed: " + err.message);
    }
    
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const edit = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    // console.log(edit);
    res.redirect(`/listings/${id}`);
});


//Delet Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})
app.listen(8080, (req, res) => {
    console.log("app is running to port 8080")
});