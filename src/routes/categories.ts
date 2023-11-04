import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/CategoryController";

const express = require('express');
const router = express.Router(); 
// const personsController = require('../controllers/person.controller');

router
    .get('/', getAllCategories)
    .get('/:id', getCategory)
    .post('/', createCategory)
    .put('/:id', updateCategory)
    .delete('/:id', deleteCategory);

module.exports = router;