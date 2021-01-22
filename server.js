
/********************************************************************************* * WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
     
* (including web sites) or distributed to other students. *
* Name: Serputov Anatoliy Student ID: 167389188 Date: 01/16/2021
* Heroku Link: _______________________________________________________________
* ********************************************************************************/

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB("mongodb+srv://serputov:serputov@cluster0.ftpdg.mongodb.net/sample_restaurants?retryWrites=true&w=majority" );
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
mongoose.connection.on("open", () => {
  console.log("Database connection open.");
});

app.get("/api/restaurants/:id", (req, res) => {
    db.getRestaurantById(req.params.id)
    .then((result) => {
      if(result){
        res.status(201).json(result)
      }else{
        res.status(204).json({error_message: 'No restaurants founded',})
      }
  })
  .catch((err) =>{
      res.status(500).json(err)
  })
   
});

app.get("/", (req, res) => {
   res.status(201).json({message: "API Listening"})
});

app.get("/api/restaurants", (req, res) => {
      db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
      .then((result) => {
            if(result){
              res.status(201).json(result)
            }else{
              res.status(204).json({error_message: 'No restaurants founded',})
            }
        })
        .catch((err) =>{
            res.status(500).json(err)
        })
});



app.put("/api/restaurants/:id", (req, res) => {
    db.updateRestaurantById(req.body,req.params.id)
    .then((result) => {
      if(result){
        res.status(201).json(result)
      }else{
        res.status(204).json({error_message: 'No restaurants founded',})
      }
  })
  .catch((err) =>{
      res.status(500).json(err)
  })
   
});



app.post("/api/restaurants", (req, res) => {
    db.addNewRestaurant(req.body)
    .then((result) => {
      if(result){
        res.status(201).json(result)
      }else{
        res.status(204).json({error_message: 'No restaurants founded',})
      }
  })
  .catch((err) =>{
      res.status(500).json(err)
  })
});

app.delete("/api/restaurants/:id", (req, res) => {
  db.deleteRestaurantById(req.params.id)
  .then((result) => {
    if(result){
      res.status(201).json(result)
    }else{
      res.status(204).json({error_message: 'No restaurants founded',})
    }
})
.catch((err) =>{
    res.status(500).json(err)
})
});




db.initialize().then(()=>{ app.listen(HTTP_PORT, ()=>{
  console.log(`server listening on: ${HTTP_PORT}`); });
  }).catch((err)=>{
  console.log(err); });
