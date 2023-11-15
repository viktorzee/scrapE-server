import { requireAuth } from "../auth/requireAuth";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/CategoryController";

const express = require('express');
const router = express.Router(); 
// const personsController = require('../controllers/person.controller');

router
    .get('/', requireAuth, getAllCategories)
    .get('/:id', requireAuth, getCategory)
    .post('/', requireAuth, createCategory)
    .put('/:id', requireAuth, updateCategory)
    .delete('/:id', requireAuth, deleteCategory);

module.exports = router;