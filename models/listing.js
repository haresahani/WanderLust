const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,

    image: {
        filename: { type: String, default: "listingimage" },
        url: {
            type: String,
            default: "https://static.vecteezy.com/system/resources/previews/007/852/911/non_2x/a-house-building-having-cracked-ground-due-to-earthquake-disaster-vector.jpg",
            set: (v) =>
                v === ""
                    ? "https://static.vecteezy.com/system/resources/previews/007/852/911/non_2x/a-house-building-having-cracked-ground-due-to-earthquake-disaster-vector.jpg"
                    : v,
        },
    },


    // image: {
    //     type: String,
    //     default: "https://static.vecteezy.com/system/resources/previews/007/852/911/non_2x/a-house-building-having-cracked-ground-due-to-earthquake-disaster-vector.jpg",
    //     set: (v) => v === ""
    //         ? "https://static.vecteezy.com/system/resources/previews/007/852/911/non_2x/a-house-building-having-cracked-ground-due-to-earthquake-disaster-vector.jpg"
    //         : v,
    // },

    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }

});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});


//models for collections in mongodb
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;