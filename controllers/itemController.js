
const item = require('../models/Item');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(function(req,res,next) {
    res.render('layout')
})

exports.items_get = asyncHandler(async function(req, res, next)
{
    const allItems = await item.find({}, "name").populate("category").exec();
    res.render('items_get', {title: "Items List", items: allItems});
})


exports.single_item_get = asyncHandler(async function(req, res, next)
{
    const Item = await item.findById(req.params.id).populate("category").exec();
    res.render('single_item_get', {item:Item})
})


exports.item_create_get = asyncHandler(function(req,res,next)
{
    res.send("Create Item page")
})

exports.item_update_get = asyncHandler(function(req,res,next)
{
    res.send("update item page")
})

exports.item_delete_get = asyncHandler(function(req,res,next){
    res.send("Delete Item page")
})

