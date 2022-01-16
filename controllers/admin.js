const Item = require('../models/products');

exports.getItems =  (req, res, next) => {
    Item.find().then(items => {
        res.render('products', {
            pageTitle: 'All Products',
            items: items
        });
    }).catch(err => {
        console.log(err);
    })
}
exports.getAddItem = (req, res, next) => {
    res.render('form', {
        pageTitle: 'Admin Add-Product',
        ed: false
    });
}
exports.postAddItem = ('/admin/addItem', (req, res, next) => {
    const itemName = req.body.itemName;
    const itemPrice = req.body.itemPrice;
    const itemImage = req.body.itemImage;
    const itemDesc = req.body.itemDesc;

    const item = new Item({
        title: itemName,
        price: itemPrice,
        imageLink: itemImage,
        description: itemDesc,
        userId: req.user
    })
    item.save().then(result => {
        console.log('Your Items have being Save');
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    })
})

exports.postDeleteItem = (req, res, next) => {
    const itemId = req.body.itemId;
    Item.findByIdAndRemove(itemId).then(result => {
        console.log('One Item Deleted!');
        res.redirect('/');
    })
}

exports.getEditItem = (req, res, next) => {
    const ed = req.query.edit;
    if (!ed) {
        return res.redirect('/');
    }
    const itemId= req.params.itemId;
    if (!itemId) {
        return res.redirect('/');
    }
    Item.findById(itemId).then(item => {
        res.render('form', {
            pageTitle: 'Edit Item',
            ed: ed,
            item: item
        })
    })
}
exports.postEditItem = (req, res, next) => {

    const itemId = req.body.itemId;

    const updatedTitle = req.body.itemName;
    const updatedPrice = req.body.itemPrice;
    const updatedImg = req.body.itemImage;
    const updatedDesc = req.body.itemDesc;

    Item.findById(itemId).then(item => {
        console.log(item);
        item.title = updatedTitle;
        item.price = updatedPrice;
        item.imageLink = updatedImg;
        item.description = updatedDesc;

        return item.save();
        
    }).then(result => {
        console.log("Your Item has being Updated!");
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    })
}