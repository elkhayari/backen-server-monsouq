const router = require('express').Router();
const Category = require('../models/category.model');


router.route('/add').post((req,res) => {
  const name = req.body.name
  const description = req.body.description
  const img = req.body.img
// ok
  const newCategory = new Category({
    name,
    description,
    img
  });

  newCategory.save()
    .then(() => res.json('category added'))
    .catch(err => res.status(404).json('Error: ' + err))

})
// UPDATE CATEGORY

router.route('/update').post((req,res) => {
  const id = req.body.id

  var data = {
     name : req.body.name,
     description : req.body.description,
     img : req.body.img,
     archive: req.body.archive
  }

  Category.findOneAndUpdate( {_id: id}  ,
                              data ,
                             {upsert: true},  function(err, doc) {
                                 if (err) return res.send(500, {error: err});
                                  return res.send('Succesfully saved.');
                               });

})


router.route('/delete').post((req,res) => {
  const id = req.body.id

  Category.findByIdAndDelete(id, function(err){
    if(err)
     console.log(err)
    else
     console.log('Successful deletion')
  } )

///  Category.find({id : id}).remove(() => res.status(200).json('category removed!'))

})




module.exports = router
