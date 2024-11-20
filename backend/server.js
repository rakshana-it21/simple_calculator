const express= require("express")
const mongoose=require("mongoose")

const cors = require('cors');
const bodyParser = require("body-parser");

const app=express();
app.use(cors());
app.use(express.json());

const port=5000;
const connectdb = async ()=>{
    try{
    mongoose.connect('mongodb://localhost:27017/calcul',{
        
    })
    console.log("connected to database")
}
catch{
    console.log("Not connected to database")
}
}
connectdb();
const calculatorSchema = new mongoose.Schema({
    val1: Number,
    val2: Number,
    operation: String,
    result: Number,
  });
  
const calculatorModel=mongoose.model('Calculation',calculatorSchema);
app.post("/save",async(req,res)=>{
    const{val1,val2,operation,result}=req.body;

try{
const addModel=new calculatorModel({
    val1,
    val2,
    operation,
    result
})
addModel.save();
res.status(200).json({msg:"Data saved successfully"})
}
catch{
    res.status(500).json({msg:"Error in saving data"})   
}})
app.listen(port,(req,res)=>{
    console.log("connected to backend")
})