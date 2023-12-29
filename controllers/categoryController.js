const category = require('../models/Category');
const asyncHandler = require('express-async-handler');
const {body , validationResult} = require('express-validator');


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
    res.render('category_create', {title:"Create Category"})
})

exports.category_create_post = [
    body("name")
     .trim()
     .isLength({min:3})
     .withMessage("Category name should be of minimum 3 letters")
     .isAlphanumeric()
     .withMessage("Your name isn't alpha numeric")
     .escape()
     .withMessage("Don't be cheeky"),
    body("desc")
     .isLength({min:20})
     .withMessage("description should be atleast 20 characters long")
     .escape()
     .withMessage("Don't be cheeky"),

    
    asyncHandler(async (req,res,next) => {
        const errors = validationResult(req);

        const cat = new category({
            name:req.body.name,
            desc:req.body.desc
        })
        if(!errors.isEmpty())
        {
            res.render('category_create', {title:"Create Category", errors:errors, cat:cat});
        } else {
            await cat.save();
            res.redirect(cat.url);
        }
    })
]

exports.category_update_get = asyncHandler(function(req,res,next)
{
    res.send("update category page")
})

exports.category_update_post = asyncHandler(function(req,res,next){
    res.send("update category post")
})

exports.category_delete_get = asyncHandler(function(req,res,next){
    res.send("Delete category page")
})


exports.category_delete_post = asyncHandler(function(req,res,next)
{
    res.send("delete category post")
})