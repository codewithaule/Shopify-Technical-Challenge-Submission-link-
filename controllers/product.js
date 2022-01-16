const Item = require('../models/products');
const User = require('../models/user');

exports.getIndex = (req, res, next) => {
    Item.find().then(items => {
        res.render('index', {
            pageTitle: 'Home',
            items:items
        });
    })
    .catch(err => {
        console.log(err);
    })
}
exports.getItem = (req, res, next) => {
    const itemId = req.params.itemId;

    Item.findById(itemId).then(item => {
        console.log(item);
        res.render('Item', {
            pageTitle: 'Item Detail',
            item: item
        })
    }).catch(err => {
        
        console.log(err);
    })
}
exports.getCart = (req, res, next) => {
   req.user.populate('cart.items.itemId').then(user => {
       const items = user.cart.items;
        res.render('cart', {
            pageTitle: 'Cart',
            items: items
        })
    })
}
exports.postCart = (req, res, next) => {
    const itemId = req.body.itemId;
    Item.findById(itemId)
    .then(item => {
       return req.user.addToCart(item);
    }).then(result => {
        console.log(result);
        res.redirect('/cart');
    })
}
exports.postDeleteCartItem = (req, res, next) => {
    const cartId = req.body.cartId;
    req.user.CancelItem(cartId).then(result => {
        console.log('Cart Item Deleted');
        res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    })
};
exports.postOrder = (req, res, next) => {
    req.user.populate('cart.items.itemId')
    .then(user => {
        const items = this.cart.items.map(i => {
            return {quantity: i.quantity}
        })
    })

}