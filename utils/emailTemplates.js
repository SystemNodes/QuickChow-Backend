const signUpTemplate = (otp, firstName) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #1f1c2c, #928dab);
                margin: 0;
                padding: 0;
                color: #333;
            }
            .wrapper {
                width: 80%;
                padding: 20px 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .card {
                background: #fff;
                border-radius: 12px;
                box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                width: 90%;
                max-width: 600px;
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #4facfe, #00f2fe);
                padding: 20px;
                text-align: center;
                color: #fff;
                border-radius: 10px 10px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 26px;
            }
            .content {
                padding: 30px;
                text-align: left;
                color: #444;
            }
            .content p {
                margin: 15px 0;
                font-size: 16px;
                line-height: 1.6;
            }
            .otp-code {
                display: block;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin: 20px 0;
                color: #667eea;
            }
            .footer {
                background: #f9f9f9;
                padding: 15px;
                text-align: center;
                font-size: 13px;
                color: #888;
                border-top: 1px solid #eee;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="card">
                <div class="header">
                    <h1>Verify Your Email</h1>
                </div>
                <div class="content">
                    <p>Hello <strong>${firstName}</strong>,</p>
                    <p>Welcome to <strong>QuickChow</strong>! To verify your email, please use the following one-time code (OTP):</p>
                    <span class="otp-code">${otp}</span>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you did not create a QuickChow account, you can safely ignore this email.</p>
                    <p>Bon appétit!<br><strong>The QuickChow Team</strong></p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} QuickChow. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  };
  
  const verificationTemplate = (otp, firstName) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #1f1c2c, #928dab);
                margin: 0;
                padding: 0;
                color: #333;
            }
            .wrapper {
                width: 80%;
                padding: 20px 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .card {
                background: #fff;
                border-radius: 12px;
                box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                width: 90%;
                max-width: 600px;
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #4facfe, #00f2fe);
                padding: 20px;
                text-align: center;
                color: #fff;
                border-radius: 10px 10px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 26px;
            }
            .content {
                padding: 30px;
                text-align: left;
                color: #444;
            }
            .content p {
                margin: 15px 0;
                font-size: 16px;
                line-height: 1.6;
            }
            .otp-code {
                display: block;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin: 20px 0;
                color: #667eea;
            }
            .footer {
                background: #f9f9f9;
                padding: 15px;
                text-align: center;
                font-size: 13px;
                color: #888;
                border-top: 1px solid #eee;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="card">
                <div class="header">
                    <h1>Verify Email Resent</h1>
                </div>
                <div class="content">
                    <p>Hello <strong>${firstName}</strong>,</p>
                    <p>Welcome to <strong>QuickChow</strong>! To verify your email, please use the following one-time code (OTP):</p>
                    <span class="otp-code">${otp}</span>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you did not create a QuickChow account, you can safely ignore this email.</p>
                    <p>Bon appétit!<br><strong>The QuickChow Team</strong></p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} QuickChow. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  };

  const resetPasswordTemplate = (otp, firstName) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #1f1c2c, #928dab);
                margin: 0;
                padding: 0;
                color: #333;
            }
            .wrapper {
                width: 80%;
                padding: 20px 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .card {
                background: #fff;
                border-radius: 12px;
                box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                width: 90%;
                max-width: 600px;
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #4facfe, #00f2fe);
                padding: 20px;
                text-align: center;
                color: #fff;
                border-radius: 10px 10px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 26px;
            }
            .content {
                padding: 30px;
                text-align: left;
                color: #444;
            }
            .content p {
                margin: 15px 0;
                font-size: 16px;
                line-height: 1.6;
            }
            .otp-code {
                display: block;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin: 20px 0;
                color: #667eea;
            }
            .footer {
                background: #f9f9f9;
                padding: 15px;
                text-align: center;
                font-size: 13px;
                color: #888;
                border-top: 1px solid #eee;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="card">
                <div class="header">
                    <h1>Password Reset</h1>
                </div>
                <div class="content">
                    <p>Hello <strong>${firstName}</strong>,</p>
                    <p>Welcome to <strong>QuickChow</strong>! To reset your password, please use the following one-time code (OTP):</p>
                    <span class="otp-code">${otp}</span>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you did not initiate a password reset, you can safely ignore this email.</p>
                    <p>Bon appétit!<br><strong>The QuickChow Team</strong></p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} QuickChow. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  };

  module.exports = {
    signUpTemplate,
    verificationTemplate,
    resetPasswordTemplate
  };
  