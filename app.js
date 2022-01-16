const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const connectDB = require('./db/connect');
const adminRoute = require('./routes/admin');
const itemRouter = require('./routes/product');
const errorRouter = require('./routes/404');
const bodyParser = require('body-parser');
const User = require('./models/user');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
  User.findById('61e17c6207bd340e969f2a9f')
  .then(user => {
    req.user = user;
    next();  
  }).catch(err => console.log(err));
})
 
app.use(adminRoute);

app.use(itemRouter);

app.use(errorRouter);

mongoose.connect(process.env.MONGO_URI)
.then(result => {
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'aule',
                email: 'aulekator@gmail.com',
                cart: {
                    items: []
                }
            })
            user.save();
        }
    })
    app.listen(port, () => {
        console.log(`app listening at port ${port}`);
    })
}).catch(err => {
    console.log(err);
})
            

