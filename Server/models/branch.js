
const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  branchId:{type:String,required:true},
  addressline:{type:String,required:true},
  area:{type:String,required:true},
  city:{type:String,required:true},
  state:{type:String,required:true},
  pincode:{type:Number,required:true},
  branchName:{type:String,required:true},
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  url:{type:String,required:true},
  status:{type:String,required:true}
});

module.exports = mongoose.model('Branch', branchSchema);

