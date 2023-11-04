import { register, deleteUser, getAllUsers, getUser, updateUser, login, validateRegistration } from "../controllers/userController";

const express = require('express');
const router = express.Router(); 

router
    .get('/',  getAllUsers)
    .get('/:id', getUser)
    .post('/register', validateRegistration, register)
    .post('/login', login)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser);

module.exports = router;