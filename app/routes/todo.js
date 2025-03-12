const express = require("express")
const router = express.Router();
const todoController = require('../controllers/todo')
const validateTodo = require('../../service/validation/todoValidation')
const bodyErrorSender =  require('../../middleware/bodyErrorSender')

router.post('/add', validateTodo,bodyErrorSender,todoController.addTodo)
router.get('/get', todoController.getTodo)
router.delete('/delete/:id', todoController.deleteTodo)
router.put('/update/:id', todoController.updateTodo)




module.exports = router;