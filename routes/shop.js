const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const categoryController = require('../controllers/categoryController')


router.get('/', itemController.index);

router.get('/categories', categoryController.categories_get);

router.get('/items', itemController.items_get);

router.get('/items/:id', itemController.single_item_get);

router.get('/categories/:id', categoryController.single_category_get);

module.exports = router