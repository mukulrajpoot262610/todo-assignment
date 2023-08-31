const router = require('express').Router()

const authController = require('../controllers/auth-controller');
const todoController = require('../controllers/todo-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/api/register', authController.registerUser);
router.post('/api/login', authController.loginUser);
router.post('/api/logout', authMiddleware, authController.logout);

// CRUD
router.post('/api/create', authMiddleware, todoController.createTodo);
router.get('/api/getTodos', authMiddleware, todoController.getAllTodo);
router.post('/api/deleteTask', authMiddleware, todoController.deleteTask)
router.delete('/api/deleteTodo/:todoId', authMiddleware, todoController.deleteTodo)
router.get('/api/markComplete/:taskId', authMiddleware, todoController.markTaskComplete)

module.exports = router;