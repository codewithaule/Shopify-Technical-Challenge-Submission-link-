const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                itemId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Item',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})

userSchema.methods.addToCart = function(item) {
    const itemIndex = this.cart.items.findIndex(p => {
        return p.itemId.toString() === item._id.toString();     
    });
    let qty = 1;
    const cartItems = [...this.cart.items];

    if (itemIndex >= 0) {
        qty = this.cart.items[itemIndex].quantity + 1;
        cartItems[itemIndex].quantity = qty;
    } else {
        cartItems.push({
            itemId: item._id,
            quantity: qty
        })
     }
     const newCart = { 
         items: cartItems
     }
     this.cart = newCart;
     return this.save();
}

userSchema.methods.CancelItem = function (id) {
    const cartItem = this.cart.items.filter(p => {
       return p.itemId.toString() !== id.toString();
    })
    this.cart.items = cartItem;
    return this.save();
}

module.exports = mongoose.model('User', userSchema);