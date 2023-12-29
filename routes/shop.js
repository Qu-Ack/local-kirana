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

router.post('/create/item', itemController.item_create_post)

router.get('/create/category', categoryController.category_create_get);

router.post('/create/category', categoryController.category_create_post)

router.get('/update/item', itemController.item_update_get);

router.post('/update/item', itemController.item_update_post);

router.get('/update/category', categoryController.category_update_get);

router.post('/update/category', categoryController.category_update_post);

router.get('/delete/item', itemController.item_delete_get);

router.delete('/delete/item', itemController.item_delete_post);

router.get('/delete/category', categoryController.category_delete_get);

router.delete('/delete/category', categoryController.category_delete_post);

module.exports = router
