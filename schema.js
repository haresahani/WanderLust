const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.object({
            url: Joi.string().uri().allow("", null)
        }).optional(),
    }).required(),
});


// majorproject/
// │
// ├── init/
// │    └── data.js
// |    |__ index.js
// ├── models/
// │    └── listing.js
// ├── views/
// │    ├── listings/
// │    │    ├── index.ejs
// │    │    ├── new.ejs
// │    │    ├── edit.ejs
// │    │    ├── show.ejs
// │    └── error.ejs
// ├── utils/
// │    ├── wrapAsync.js
// │    ├── ExpressError.js
// ├── schema.js
// └── app.js
