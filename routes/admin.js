const express = require('express');
const adminRoute = express.Router();

const adminControllers = require('../controllers/admin');

adminRoute.get('/products',adminControllers.getItems);

adminRoute.get('/form', adminControllers.getAddItem);

adminRoute.post('/admin/addItem', adminControllers.postAddItem);

adminRoute.post('/admin/edit-item', adminControllers.postEditItem);

adminRoute.post('/admin/delete-item', adminControllers.postDeleteItem);

adminRoute.get('/admin/edit-item/:itemId', adminControllers.getEditItem);

module.exports = adminRoute;
