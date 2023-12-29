const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const categoryController = require('../controllers/categoryController')


router.get('/', itemController.index);

router.get('/categories', categoryController.categories_get);

router.get('/items', itemController.items_get);

router.get('/items/:id', itemController.single_item_get);

router.get('/categories/:id', categoryController.single_category_get);

router.get('/create/item', itemController.item_create_get);

router.get('/create/category', categoryController.category_create_get);

router.get('/update/item', itemController.item_update_get);

router.get('/update/category', categoryController.category_update_get);

router.get('/delete/item', itemController.item_delete_get);

router.get('/delete/category', itemController.item_delete_get);

module.exports = router
