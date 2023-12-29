
const item = require('../models/Item');
const Category = require('../models/Category')
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

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


exports.item_create_get = asyncHandler(async function(req,res,next)
{
    const allCategories = await Category.find().sort({name: 1}).exec();
    // console.log(allCategories)
    // res.send(allCategories)

    res.render('item_create', {title:"Create Item", categories:allCategories});
})

exports.item_create_post = [




    body("name")
     .trim()
     .isLength({min:3})
     .escape()
     .withMessage("Name must be specified")
     .isAlphanumeric()
     .withMessage("First name has non alpha numeric characters"),
    body("desc")
     .isLength({min:20})
     .escape()
     .withMessage("don't try to be cheeky"),
    body("price")
     .trim()
     .toInt(),
    body("number_in_stock")
     .toInt(),
    body("category.*").escape(),
     

    asyncHandler(async function(req,res,next)
    {
        const errors = validationResult(req);

        const prod = new item({
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            number_in_stock: req.body.number_in_stock,
            category: req.body.category
        })

        if (!errors.isEmpty())
        {
            const allCategories = await Category.find({}).sort({name:1}).exec()

            console.log(allCategories)

            // for (const category of allCategories)
            // {
            //     if (item.category.includes(category._id))
            //     {
            //         category.checked = "true";
            //     }
            // }

            res.render('item_create', {title: "Create Item", errors:errors.array(), categories:allCategories, prod:prod})
        } else {
            await prod.save();

            res.redirect(prod.url);
        }
    })
]

exports.item_update_get = asyncHandler(function(req,res,next)
{
    res.send("update item page")
})

exports.item_update_post = asyncHandler(function(req,res,next){
    res.send("update Post")
})

exports.item_delete_get = asyncHandler(function(req,res,next){
    res.send("Delete Item page")
})

exports.item_delete_post = asyncHandler(function(req,res,next){
    res.send("delete post")
})


