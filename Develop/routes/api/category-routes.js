const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
 
  // be sure to include its associated Products
try{
   // find all categories
   const categories = await Category.findAll({include: [{mode: Product}]});
   res.status(200).json(categories);
} catch(error){
  //handle error by sending 500 status with a custom message
  res.status(500).json({message: 'not found!'})
}
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value with its assocated product
  try{
    const category = await Category.findByPk(req.params.id, {include:[{model:Product}]})

    //if category not found, send a 404 status with a custom message
  if (!category){
    res.status(404).json({message: 'id not found'});
    return;
  }
  res.status(200).json(category);
}catch(error){
res.status(500).json({message: 'not found'});
  }
 
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
  }
  catch(error){
res.status(400).json({message: 'could not create category'})
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const updated = await Category.update(req.body, {where:{id: req.params.id}});
    //if the category is not found respond with 404 status
    !updated[0]? res.status(404).json({message: 'id not found'}): res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ messge: 'update failed'});
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({where: { id: req.params.id}});
    //if category not found respond with 404 status else return the deleted data
    !deleted? res.status(404).json({message: 'id not found'}):res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json(err);
  }

});

module.exports = router;
