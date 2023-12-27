const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const itemSchema = new Schema({
    name:{type:String, required: true, minLength:3, maxLength:1000},
    desc:{type:String, minLength:10},
    price:{type:Number, min:0, required:true},
    number_in_stock:{type:Number, min:0},
    category:{type:Schema.Types.ObjectId, ref:"Category"}
})


itemSchema.virtual('url').get(function() {
    return `/items/${this._id}`
})


const item = mongoose.model("Item", itemSchema);

module.exports = item;