const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require('method-override');
const engine = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require('./models/review.js');
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

main()
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
};

app.get("/", (req, res) => {
    res.render("home.ejs")
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter)

app.use((req, res, next) => { // app.all("*", (req, res, next)
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    console.error('Error details:', err);  // Log full error for debugging
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message, statusCode });
});

app.listen(8080, (req, res) => {
    console.log("app is running to port 8080")
});