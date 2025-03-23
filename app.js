const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
//ejs ka setup ke  liye
const path = require("path");
//method override
const methodOverride = require("method-override");

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
app.use(methodOverride("_method"));

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

//New Route   (new ko show ke upar taaki voh new ko id na le/samjhe)
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id",async(req,res)=>{
let {id} = req.params; //1
const listing = await Listing.findById(id);
res.render("listings/show.ejs",{listing});
})

//create route
app.post("/listings",async(req,res)=>{
    //let {title,description,image,price,country,location}=req.body;
    const newListing = new Listing(req.body.Listing);
    await newListing.save();
   res.redirect("/listings");

})

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params; 
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})


let port = 3000;
app.listen(port,()=>{
    console.log(`server is listening to port ${port}`)
})