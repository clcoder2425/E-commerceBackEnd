const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async(req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const products= await Product.findAll({
      include: [{model: Category}, {model: Tag}],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: 'Products not found'});
  }
});

// get one product
router.get('/:id', async(req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
try {
  const product = await Product.findByPk(req.params.id, {
    include: [{model: Category}, {model: Tag}],
  });
  !product? res.status(404).json({ mesage: 'Product not found'}): res.status (200).json(product);
} catch (error) {
  res.status(500).json({ message: 'Product not found'});
}
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
    
  });

  // Product.create(req.body)
    // .then((product) => {
    //   // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    //   if (req.body.tagIds.length) {
    //     const productTagIdArr = req.body.tagIds.map((tag_id) => {
    //       return {
    //         product_id: product.id,
    //         tag_id,
    //       };
    //     });
    //     return ProductTag.bulkCreate(productTagIdArr);
    //   }
    //   // if no product tags, just respond
    //   res.status(200).json(product);
    // })
    // .then((productTagIds) => res.status(200).json(productTagIds))
    // .catch((err) => {
    //   console.log(err);
    //   res.status(400).json(err);
    // });


// update product
router.put('/:id', async(req, res) => {
  // update product data
  try {
    await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  //Validate if the re.body.tags exist and has any length
  if (req.body.tags && req.body.tags.length>0){
   //Find productTags and their ids
    const productTags = await ProductTag.findAll({ where: {product_id: req.params.id}});
    const productTagIds = productTags.map(({tag_id})=>tag_id);
    //filter new product tags and create new ones
    const newProductTags = req.body.tags.filter((tag_id)=> !productTagIds.include(tag_id))
    .map((tag_id)=>{
      return{
        product_id: req.params.id,
        tag_id,
      };
    });
//Filter productTags to remove and delete them
    const productTagsToRemove = productTags.filter(({tag_id})=> !req.body.tags.include(tag_id))
    .map(({id})=>id);
    await Promise.all([
      ProductTag.destroy({where: {id: productTagsToRemove}}),
      ProductTag.bulkCreate(newProductTags),
    ]);
  }

  //Respond with updated product
  const product = await Product.findByPk(req.params.id, {include: [{model:Tag}]});
  return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
  
    // .then((product) => {
    //   if (req.body.tagIds && req.body.tagIds.length) {

    //     ProductTag.findAll({
    //       where: { product_id: req.params.id }
    //     }).then((productTags) => {
    //       // create filtered list of new tag_ids
    //       const productTagIds = productTags.map(({ tag_id }) => tag_id);
    //       const newProductTags = req.body.tagIds
    //         .filter((tag_id) => !productTagIds.includes(tag_id))
    //         .map((tag_id) => {
    //           return {
    //             product_id: req.params.id,
    //             tag_id,
    //           };
    //         });

    //       // figure out which ones to remove
    //       const productTagsToRemove = productTags
    //         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
    //         .map(({ id }) => id);
    //       // run both actions
    //       return Promise.all([
    //         ProductTag.destroy({ where: { id: productTagsToRemove } }),
    //         ProductTag.bulkCreate(newProductTags),
    //       ]);
    //     });
    //   }

    //   return res.json(product);
    // })
    // .catch((err) => {
    //   // console.log(err);
    //   res.status(400).json(err);
    // });
});

router.delete('/:id', async(req, res) => {
  // delete one product by its `id` value
  try {
    const deleted = await Product.destroy({where: { id: req.params.id}});
    !deleted? res.status(404).json({ message: 'id not found'}): res.status(200).json(deleted)
  } catch (error) {
    res.status(500).json({message: 'Unable to delete product', err: error});
  }
});

module.exports = router;
