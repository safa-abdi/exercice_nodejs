const express = require ("express")
const app= express()
const bookRoutes=require("./routes/book")
const userRoutes=require("./routes/user")
const authorRoutes=require("./routes/author")
const eventRoutes = require('./routes/eventRoutes');

const mongoose = require('mongoose')

mongoose
.connect("mongodb://127.0.0.1:27017/Database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

  app.use(express.json())

/*
app.use((req,res,next)=>{
    console.log("requete recue")
    next()
})
app.use((req,res,next)=>{
    res.status(201)
    next()
})


app.use((req,res,next)=>{
    res.json({message:"votre requ bien recue"})
    next()
})

app.use((req,res,next)=>{
    console.log("reponse envoyee avec succes")
   
})

*/

app.use("/api/books",bookRoutes)
app.use("/api/auth",userRoutes)
app.use("/api/author",authorRoutes)
app.use('/api', eventRoutes);

module.exports=app