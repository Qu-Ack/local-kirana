const category = require('../models/Category');
const asyncHandler = require('express-async-handler');


exports.categories_get = asyncHandler(async function(req,res,next)
{
    const allCategories = await category.find({}).exec();
    res.render('categories_get', {title:"Category List", categories: allCategories});
})

exports.single_category_get = asyncHandler(async function(req, res, next)
{
    const Category = await category.findById(req.params.id).exec();
    res.render('single_category_get', {category:Category});
})


exports.category_create_get = asyncHandler(function(req,res,next)
{
    res.send("Create category page")
})

exports.category_update_get = asyncHandler(function(req,res,next)
{
    res.send("update category page")
})

exports.category_delete_get = asyncHandler(function(req,res,next){
    res.send("Delete category page")
})