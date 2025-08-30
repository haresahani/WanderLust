const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

});

//models for collections in mongodb
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;