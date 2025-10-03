const userModel = require('../models/userModel');
const mailer = require('../middleware/brevo');
const generateOTP = require('../utils/otpGenerator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { 
    signUpTemplate, 
    verificationTemplate, 
    resetPasswordTemplate
} = require('../utils/emailTemplates');

exports.signUp = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        const existingUser = await userModel.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const signupOtp = generateOTP();
        const signupOtpExpires = Date.now() + 10 * 60 * 1000;

        const user = new userModel({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            signupOtp,
            signupOtpExpires
        });

        await user.save();
     
        const emailOptions = {
            email: user.email,
            subject: "Your QuickChow Verification Code",
            html: signUpTemplate(signupOtp, user.firstName),
        };

        await mailer(emailOptions);
        console.log("OTP email sent successfully");
        
        const {password: userPassword, signupOtp: otp, signupOtpExpires: otpExpires, ...userData} = user.toObject();

        res.status(201).json({
            message: "User registered successfully",
            data: userData
        });
        
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.verifySignupOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const user = await userModel.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified. Please login." });
        }

        if (!user.signupOtp || !user.signupOtpExpires) {
            return res.status(400).json({ message: "No OTP found or OTP expired. Please request a new one." });
        }

        if (String(user.signupOtp) !== String(otp)) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (Date.now() > new Date(user.signupOtpExpires).getTime()) {
            return res.status(400).json({ message: "OTP expired. Please request a new one." });
        }

        user.isVerified = true;
        user.signupOtp = undefined;
        user.signupOtpExpires = undefined;
        await user.save();

        res.status(200).json({ message: "User verified successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.resendSignupOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await userModel.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified, please login." });
        }

        const otp = generateOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000;

        user.signupOtp = otp;
        user.signupOtpExpires = otpExpires;
        await user.save();

        const emailOptions = {
            email: user.email,
            subject: "Your new verification OTP",
            html: verificationTemplate(otp, user.firstName)
        };

        await mailer(emailOptions);

        res.status(200).json({ message: "OTP resent successfully. Check your email." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

  
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({
            email: email.toLowerCase()
        });
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!user.isVerified) {
            return res.status(401).json({ 
                message: "User not verified. Check your email." 
            });
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
            return res.status(400).json({
                message: 'Incorrect Password'
            });
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '1hr'});

        res.status(200).json({
            message: 'Login Successfull',
            token
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = generateOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000;

        user.resetOtp = otp;
        user.resetOtpExpires = otpExpires;
        await user.save();

        await mailer({
            to: user.email,
            subject: "Reset your Password",
            html: resetPasswordTemplate(otp, user.firstName)
        });

        res.status(200).json({ message: "Password reset OTP sent" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.resendResetOTP = async (req, res) => {
    try {
        const { email } = req.body;
  
        const user = await userModel.findOne({ 
            email: email.toLowerCase() 
        });
        if (!user) return res.status(404).json({ message: "User not found" });
  
        if (!user.resetOtpVerified) {
            const otp = generateOTP();
            const otpExpires = Date.now() + 10 * 60 * 1000;
  
            user.resetOtp = otp;
            user.resetOtpExpires = otpExpires;
            await user.save();
    
            await mailer({
                to: user.email,
                subject: "Your password reset OTP",
                html: verificationTemplate(resetOtp, user.firstName)
            });
  
            return res.status(200).json({ 
                message: "Reset OTP resent successfully" 
            });
        }
  
        res.status(400).json({ 
            message: "OTP already verified. You can reset password now." 
        });
  
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.verifyResetOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await userModel.findOne({ 
            email: email.toLowerCase() 
        });
        if (!user) return res.status(404).json({ message: "User not found" });
  
        if (user.resetOtp !== otp || Date.now() > user.resetOtpExpires) {
            return res.status(400).json({ 
                message: "Invalid or expired OTP" 
            });
        }
  
        user.resetOtpVerified = true;
        await user.save();
  
        res.status(200).json({ 
            message: "OTP verified. You can now reset your password." 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await userModel.findOne({ 
            email: email.toLowerCase() 
        });
        if (!user) return res.status(404).json({ message: "User not found" });
        if (!user.resetOtpVerified) return res.status(401).json({ message: "OTP not verified" });
  
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOtp = undefined;
        user.resetOtpExpires = undefined;
        user.resetOtpVerified = false;
        await user.save();
  
        res.status(200).json({ 
            message: "Password reset successfully" 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
  
        const user = await userModel.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (newPassword !== confirmPassword) return res.status(404).json({ message: "Passwords do not match"});
  
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
  
        res.status(200).json({ 
            message: "Password updated successfully" 
        });
  
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

