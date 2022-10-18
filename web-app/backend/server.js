require("dotenv").config()
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const app = express();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'bilmem'
}, function(err){
    if(!err){
        console.log("Database Connected!")
    }else{
        console.log(err)
    }
})

const murderSchema = mongoose.Schema({
    id: Number,
    name: String,
    age: String,
    city: Number,
    date: String,
    why: Number,
    byWho: Number,
    protection: String,
    howKilled: Number,
    killerStatus: Number,
    source: String
},{collection: "murder"})
const murder = mongoose.model("murder", murderSchema)

app.get("/murderbycity/:city", (req,res) => {
    murder.find({city:req.params.city})
    .then((items)=>{
        res.json(items)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get("/murderall", (req,res) => {
    murder.find({})
    .then((items)=>{
        res.json(items)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get("/getcitycount", (req,res) => {
    murder.aggregate([
    {
        $group: {
            _id: '$city',
            count: { $sum: 1 } // this means that the count will increment by 1
        }
    },
    {$sort: {count:1}} 
    ])
    .then((items)=>{
        res.json(items)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.listen(4000, () => console.log("server is up and running"))
