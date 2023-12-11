// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//Defining relationships between models

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', //This ismthe foreing key in the Product model
})
// Categories have many Products
Category.hasMany(Product,{
  foreignKey: 'category_id',// This is the foreign key in the Product model
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag,{
  through: ProductTag, // This is the intermedia model
  oreignKey: 'product_id,' //The foreign key in the product model
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, //the intermediate model
  foreignKey: 'tag_id,' //This is the foreign key in the tag model
});

//Export models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
