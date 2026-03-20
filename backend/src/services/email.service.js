const nodemailer = require('nodemailer');
const crypto = require('crypto');

let transporter = null;

const createTransporter = async () => {
    if (transporter) return transporter;

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    return transporter;
};

const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

const sendWelcomeEmail = async (user) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'MindCare AI <noreply@mindcareai.com>',
        to: user.email,
        subject: 'Welcome to MindCare AI - Your Journey to Mental Wellness Begins',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
                <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    <div style="background: linear-gradient(135deg, #2BBFB0, #3A7BDB); padding: 50px 30px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700;">🧠 MindCare AI</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0; font-size: 16px;">Your Trusted AI Companion for Mental Wellness</p>
                    </div>
                    <div style="padding: 50px 40px;">
                        <p style="color: #5B6E7D; font-size: 14px; margin: 0 0 10px;">Dear Valued User,</p>
                        
                        <h2 style="color: #0D1E2D; margin: 20px 0 25px; font-size: 26px;">Thank You for Choosing MindCare AI</h2>
                        
                        <p style="color: #5B6E7D; line-height: 1.9; font-size: 16px; margin: 0 0 25px;">
                            We are pleased to inform you that your account has been successfully created. Welcome to the MindCare AI community, where your mental well-being is our top priority.
                        </p>
                        
                        <p style="color: #5B6E7D; line-height: 1.9; font-size: 16px; margin: 0 0 25px;">
                            MindCare AI is designed to provide you with <strong>24/7 emotional support</strong>, intelligent mood tracking, and personalized mindfulness resources—all within a secure and confidential environment.
                        </p>

                        <div style="background: #f0f9f8; border-radius: 12px; padding: 25px; margin: 30px 0; border-left: 4px solid #2BBFB0;">
                            <h3 style="color: #0D1E2D; margin: 0 0 15px; font-size: 18px;">What You Can Expect:</h3>
                            <ul style="color: #5B6E7D; font-size: 15px; line-height: 2; margin: 0; padding-left: 20px;">
                                <li>AI-powered conversational support available anytime</li>
                                <li>Daily mood tracking and insights</li>
                                <li>Guided mindfulness and breathing exercises</li>
                                <li>Personalized wellness recommendations</li>
                            </ul>
                        </div>

                        <p style="color: #5B6E7D; line-height: 1.9; font-size: 16px; margin: 30px 0;">
                            Your privacy is paramount to us. All conversations are encrypted and kept strictly confidential. We are committed to supporting your mental health journey with empathy, respect, and professionalism.
                        </p>
                        
                        <p style="color: #5B6E7D; line-height: 1.9; font-size: 16px; margin: 0 0 30px;">
                            Should you have any questions or require assistance, please do not hesitate to contact our support team.
                        </p>

                        <p style="color: #5B6E7D; line-height: 1.9; font-size: 16px; margin: 0 0 10px;">
                            With warm regards,
                        </p>
                        <p style="color: #0D1E2D; font-size: 18px; font-weight: 700; margin: 0;">
                            The MindCare AI Team
                        </p>
                        <p style="color: #9EAAB5; font-size: 14px; margin: 10px 0 0;">
                            Supporting Your Mental Wellness, Every Day
                        </p>
                    </div>
                    <div style="background: #0D1E2D; padding: 30px; text-align: center;">
                        <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 0 0 10px;">
                            🌐 www.mindcareai.com | 📧 support@mindcareai.com
                        </p>
                        <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 10px 0 0;">
                            © ${new Date().getFullYear()} MindCare AI. All rights reserved.<br>
                            This is an automated message. Please do not reply directly to this email.
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `
MindCare AI - Welcome to Your Mental Wellness Journey

Dear Valued User,

Thank you for choosing MindCare AI. We are pleased to confirm that your account has been successfully created.

WHAT YOU CAN EXPECT:
• 24/7 AI-powered conversational support
• Daily mood tracking and insights
• Guided mindfulness and breathing exercises
• Personalized wellness recommendations

Your privacy is paramount to us. All conversations are encrypted and kept strictly confidential.

Should you have any questions, please contact our support team at support@mindcareai.com.

With warm regards,
The MindCare AI Team

© ${new Date().getFullYear()} MindCare AI. All rights reserved.
        `,
    };

    try {
        await createTransporter();
        
        if (transporter) {
            const info = await transporter.sendMail(mailOptions);
            console.log('========================================');
            console.log('✅ WELCOME EMAIL SENT SUCCESSFULLY');
            console.log(`📧 To: ${user.email}`);
            console.log(`🔗 Preview: ${nodemailer.getTestMessageUrl(info)}`);
            console.log('========================================');
        } else {
            console.log('========================================');
            console.log('📧 WELCOME EMAIL (SMTP not configured)');
            console.log(`To: ${user.email}`);
            console.log('========================================');
        }
    } catch (error) {
        console.error('❌ Email sending error:', error.message);
    }
};

const sendVerificationEmail = async (user) => {
    const verificationToken = generateVerificationToken();
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'MindCare AI <noreply@mindcareai.com>',
        to: user.email,
        subject: 'MindCare AI - Verify Your Email Address',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
                <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    <div style="background: linear-gradient(135deg, #2BBFB0, #3A7BDB); padding: 40px 30px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">🧠 MindCare AI</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 14px;">Your AI Companion for Mental Wellness</p>
                    </div>
                    <div style="padding: 40px 30px;">
                        <h2 style="color: #0D1E2D; margin: 0 0 20px; font-size: 24px;">Dear ${user.name},</h2>
                        <p style="color: #5B6E7D; line-height: 1.8; font-size: 16px; margin: 0 0 20px;">
                            Thank you for creating an account with <strong>MindCare AI</strong>. To ensure the security of your account and activate all features, please verify your email address.
                        </p>
                        <div style="text-align: center; margin: 35px 0;">
                            <a href="${verificationUrl}" style="background: linear-gradient(135deg, #2BBFB0, #3A7BDB); color: #ffffff; padding: 16px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(43, 191, 176, 0.4);">
                                Verify Email Address
                            </a>
                        </div>
                        <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 25px 0;">
                            <p style="color: #8FA0AE; font-size: 13px; margin: 0 0 8px;">Or copy this link:</p>
                            <p style="color: #2BBFB0; font-size: 12px; word-break: break-all; margin: 0;">${verificationUrl}</p>
                        </div>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                        <p style="color: #9EAAB5; font-size: 13px; text-align: center; margin: 0;">
                            If you did not create this account, please ignore this email.<br>
                            This verification link will expire in 24 hours.
                        </p>
                    </div>
                    <div style="background: #0D1E2D; padding: 25px 30px; text-align: center;">
                        <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 0;">
                            © ${new Date().getFullYear()} MindCare AI. All rights reserved.
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `MindCare AI - Email Verification\n\nDear ${user.name},\n\nThank you for creating an account with MindCare AI. Please verify your email address by clicking the link below:\n\n${verificationUrl}\n\nThis link expires in 24 hours.\n\nIf you did not create this account, please ignore this email.\n\n© ${new Date().getFullYear()} MindCare AI`,
    };

    try {
        await createTransporter();
        
        if (transporter) {
            const info = await transporter.sendMail(mailOptions);
            console.log('========================================');
            console.log('✅ VERIFICATION EMAIL SENT SUCCESSFULLY');
            console.log(`📧 To: ${user.email}`);
            console.log(`🔗 Preview: ${nodemailer.getTestMessageUrl(info)}`);
            console.log('========================================');
        } else {
            console.log('========================================');
            console.log('📧 EMAIL VERIFICATION');
            console.log(`To: ${user.email}`);
            console.log(`Link: ${verificationUrl}`);
            console.log('========================================');
        }
        return verificationToken;
    } catch (error) {
        console.error('❌ Email error:', error.message);
        return verificationToken;
    }
};

module.exports = { sendVerificationEmail, sendWelcomeEmail, generateVerificationToken };
