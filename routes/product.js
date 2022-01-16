const express = require('express');

const itemRouter = express.Router();

const itemControllers = require('../controllers/product');

itemRouter.get('/', itemControllers.getIndex);

itemRouter.get('/cart', itemControllers.getCart);

itemRouter.post('/admin/cart', itemControllers.postCart);

itemRouter.post('/order', itemControllers.postOrder);

itemRouter.post('/deleteItem', itemControllers.postDeleteCartItem);

itemRouter.get('/item-detail/:itemId', itemControllers.getItem);

module.exports = itemRouter;