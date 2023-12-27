#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const category = require('./models/Category');

const mongoose = require("mongoose");
const item = require('./models/Item');
mongoose.set("strictQuery", false);


const items = [];
const categories = [];


const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main()
{
  mongoose.connect(mongoDB);
  await catIn();
  await ItemIn();
  console.log("Data added successfully ......");
  

}

async function addCategories(index, name, desc)
{
  const cat = new category({name:name , desc:desc});
  await cat.save();
  categories[index] = cat;
  console.log(`Adding category:  ${name}`)
}


async function addItems(index, name, desc, price, quant, category)
{
  const itemDetail = {
    name:name,
    desc:desc,
    price:price,
    number_in_stock:quant,
    category:category
  }
  const item_model = new item(itemDetail)
  await item_model.save();
  items[index] = item_model;
  console.log(`Adding Item : ${name}`)
}


async function catIn()
{
  console.log("adding categories")
  await Promise.all([
    addCategories(0, "Dairy" , "Well the name is quite self explanatory but if you are a dumb idiot then things like milk, butter , cheese etc"),
    addCategories(1, "Chips And Munchies", "THe things that we all love your favourite go to snacks at night. Lays , doritos , pringles you name it"),
    addCategories(2, "Sweets" , "Cakes, sweets and stuff , this is my personal favourite")
  ])
}


async function ItemIn()
{
  console.log("Adding Items");
  await Promise.all([
    addItems(0, "Milk", "Your mother's milk..... Haha kidding, but send me some if you find it", 90, 10, categories[0] ),
    addItems(1, "Lays", "I love this one this, Can't live without this", 20, 200 , categories[1]),
    addItems(2, "Britania Cake", "I used to eat this everyday but now I am just fat", 40 , 100, categories[2])
  ])
}