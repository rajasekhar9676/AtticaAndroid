const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
    name:{type:String},
    description:{type:String},
    price:{type:Number},
    image:{type:String},
    category:{type:String} ,
    weights:{type:Number}
})  

const Product=mongoose.model('product',ProductSchema)
module.exports=Product 


