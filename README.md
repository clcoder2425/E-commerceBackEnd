# E-commerceBackEnd

## Description
The E-commerce Back En project to provide electronics industry with a back end that uses the latest technologies, empowering them to compete with other e-commece companies.

## User Story and Acceptance Criteria
#### User Story
`AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies`

#### Acceptance Criteria
`GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database`

## Table of Contents 
- [Description](#Description)
- [User-story&Acceptance-criteria](#User-Story&Acceptance-Criteria)
- [Installation](#Installation)
- [Usage](#Usage)
- [Skill-Improved](#Skill-Improved)
- [Technologies](#Technologies)
- [Authors](#Authors)
- [Credits](#credits)

## Installation
- Install dependencies: `npm install`
- Set up enviroment variables: Create a `.env` file in the root directory, use the guide on the `.env.example` file.
- Start the server using the command: `npm start`
- Set up the API endpints using insomia or postman 

## Usage
### API Endpoints


Webpage use example:https://drive.google.com/file/d/16KgBSpcoXlpm5c2BLTvEeirTkfnYKR5L/view

#### Tags
- GET/api/tags: get all tags
- GET/api/tags/id: get tag by id
- POST/api/tags: Create a new tag
- PUT/api/tags/tagid: Update an existing tag
- DELETE/api/tags/tagId: Delete an existing tag
#### Categories
- GET/api/categories: get all categories
- GET/api/categories/categoryId: get category by id
- POST/api/categories: Create a new tag
- PUT/api/categories/categoryId: Update an existing category
- DELETE/api/categories/categoryId: Delete an existing category
#### Products
- GET/api/products: get all products
- GET/api/products/id: get product by id
- POST/api/products: Create a new product
- PUT/api/products/tagid: Update an existing product
- DELETE/api/products/tagId: Delete an existing product

    
## Skills Improved
- Javascript
- Designing models with sequelize
- Express.js
- Using .env
- End Point Testing

## Technologies
 - [JavaScript](#JavaScript)
 - [Mysql2](#https://www.npmjs.com/package/mysql2)
 - [Express.js](#https://www.npmjs.com/package/express)
 - [dotenv](#https://www.npmjs.com/package/dotenv)
 - [Sequelize](#https://www.npmjs.com/package/sequelize)
 - [Nodemon](#https://www.npmjs.com/package/nodemon?activeTab=versions)
## License
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Authors
- [Carmen-Jimenez](#Carmen Jimenez https://github.com/clcoder2425/E-commerceBackEnd.git)

## Credits

- [How-to-use-insomnia](#https://docs.insomnia.rest/insomnia/get-started)




