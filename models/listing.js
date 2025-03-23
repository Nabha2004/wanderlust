const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title  : {
    type : String ,
    required : true,
    },
    description : String , 
    image : {
    type  : String , 
    default : "https://unsplash.com/photos/assorted-hot-air-balloons-flying-at-high-altitude-during-daytime-hpTH5b6mo2s",
    set : (v) => v === "" ? "https://unsplash.com/photos/assorted-hot-air-balloons-flying-at-high-altitude-during-daytime-hpTH5b6mo2s" : v, 
    },
    price : Number ,
    location : String ,
    country : String ,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing ;