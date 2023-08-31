const router = require('express').Router()

const authController = require('../controllers/auth-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/api/register', authController.registerUser);
router.post('/api/login', authController.loginUser);
router.post('/api/logout', authMiddleware, authController.logout);

module.exports = router;