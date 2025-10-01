const { 
    signUp, 
    verifySignupOTP,
    resendSignupOTP,
    login,
    forgotPassword,
    resendResetOTP,
    verifyResetOTP,
    resetPassword,
    updatePassword     
} = require('../controllers/userController');

const authenticateJWT = require('../middleware/authMiddleware');

const { 
    signUpValidator, 
    loginValidator 
} = require('../middleware/validationMiddleware');

const router = require('express').Router();

router.post('/signup', signUpValidator, signUp);
router.post('/verify-signup-otp', verifySignupOTP);
router.post('/resend-signup-otp', resendSignupOTP);
router.post('/login', loginValidator, login);
router.post('/forgot-password', forgotPassword);
router.post('/resend-reset-otp', resendResetOTP);
router.post('/verify-reset-otp', verifyResetOTP);
router.post('/reset-password', resetPassword);
router.post('/update-password', authenticateJWT, updatePassword);


module.exports = router;
