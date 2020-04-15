const router = require('express').Router();
const Product = require('../models/product.model');

router.route('/').get((req, res) =>{
    Product.find()
           .then(products => res.json(products))
           .catch(err => res.status(400).json('Error:' + err))
})

// Add A Product
router.route('/add').post((req, res) => {
    const title = req.body.title;
    const category = req.body.category;
    const img = req.body.img;
    const price = req.body.price;
    const brand = req.body.brand;
    const info = req.body.info;
    const inCart = req.body.inCart;
    const count = req.body.count;
    const total = req.body.total;
    const date = req.body.date;
    

    const newProduct = new Product({
        title,
        category,
        img,
        price,
        brand,
        info,
        inCart,
        count,
        total,
        date });

        newProduct.save()
           .then(() => res.json('Product Added!'))
           .catch(err => res.status(400).json('Error:' + err))
});


module.exports = router
