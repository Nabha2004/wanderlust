const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
//ejs ka setup ke  liye
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

//ejs ke liye
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));  //1 ke liye(taaki parse kr paye)

app.get("/",(req,res)=>{
    res.send("Hi , I am root!");
})

// app.get("/testListing",async(req,res)=>{
// let sampleListing = new Listing({
//     title : "My new Villa",
//     description : "By the beach",
//     price : 1200,
//     location : "Calungute , Goa",
//     country : "India"
// });

// await sampleListing.save();
// console.log("sample was saved");
// res.send("successful testing");

// })

app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//show route
app.get("/listings/:id",async(req,res)=>{
let {id} = req.params; //1
const listing = await Listing.findById(id);
res.render("listings/show.ejs",{listing});
})

let port = 3000;
app.listen(port,()=>{
    console.log(`server is listening to port ${port}`)
})