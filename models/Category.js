const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const categorySchema = new Schema({
    name:{type:String , required:true, minLength:3, maxLength:20},
    desc:{type:String, required:true, minLength:20, maxLength:1000},
})


categorySchema.virtual('url').get(function()
{
    return `/category/${this._id}`;
})


const category = mongoose.model("Category", categorySchema);

module.exports = category;