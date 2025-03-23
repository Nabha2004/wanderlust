const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title  : {
    type : String ,
    required : true,
    },
    description : String , 
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        set: (v) => {
            if (typeof v === "object" && v.url) {
                return v.url; // Store only the URL from the object
            }
            return v || "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0";
        },
    },
    price : Number ,
    location : String ,
    country : String ,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing ;