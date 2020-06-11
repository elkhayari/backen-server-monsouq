const router = require('express').Router();
const Product = require('../models/product.model');

router.route('/').get((req, res) =>{
    Product.find()
           .then(products => res.json(products))
           .catch(err => res.status(400).json('Error:' + err))
})
// tanchof nta f product daba ?
// Add A Product
router.route('/add').post((req, res) => {
    const title = req.body.title;
    const category = req.body.category;
    const img = req.body.img;
    const price = req.body.price;
    const brand = req.body.brand;
    const info = req.body.info;
    const date = req.body.date;


    const newProduct = new Product({
        title,
        category,
        img,
        price,
        brand,
        info
        });

        newProduct.save()
           .then(() => res.json('Product Added!'))
           .catch(err => res.status(400).json('Error:' + err))
});

// Update By // Id
router.route('/update').post((req, res) =>{
  const id = req.body.id // <<<<<<<

  var data = {
     title : req.body.title,
     category : req.body.category,
     img : req.body.img,
     price : req.body.price,
     brand : req.body.brand,
     info : req.body.info, 
     stock: req.body.stock
  }

  Product.findOneAndUpdate({_id: id},
                            data,
                            {upsert:true}, function(err, doc){
                              if(err)
                                 return res.send(500, {error: err});
                              return res.send('Succesfully updated.');
                            })
})

// Delete By Id

router.route('/delete').post( (req, res) => {

   const id = req.body.id
   Product.find({   _id: id}).remove(function(err) {
     if ( !err) res.status(200).json('Product Id' + id + ' deleted!')
     else res.status(404).json('Error while deleting product id ')
   })
})

module.exports = router


/*
{
        "count": 0,
        "total": 0,
        "title": "Bananas",
        "category": "category test",
        "img": "img/bananas.jpg",
        "price": 12,
        "brand": "GOOGLE",
        "info": "c'est la''  helvetica photo booth gentrify.",
        "inCart": false,
        "date": "2020-04-13T23:34:19.435Z",
        "createdAt": "2020-04-13T23:34:19.454Z",
        "updatedAt": "2020-04-13T23:34:19.454Z",
        "__v": 0

    }
*/
