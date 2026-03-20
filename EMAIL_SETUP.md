# Email Setup Guide

This guide will help you configure email sending for MindCare AI.

## Option 1: Gmail SMTP (Recommended for Production)

### Step 1: Enable 2-Factor Authentication on Gmail
1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" as the app
3. Select "Other (Custom name)" and enter "MindCare AI"
4. Copy the 16-character password

### Step 3: Update .env file
Add these lines to `backend/.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
EMAIL_FROM=MindCare AI <your-email@gmail.com>
```

---

## Option 2: Ethereal Email (Free Testing)

Ethereal is a free SMTP service that captures emails instead of sending them. Perfect for development.

### Step 1: Create Ethereal Account
1. Go to: https://ethereal.email
2. Click "Create Account" 
3. Or use this direct link: https://ethereal.email/register

### Step 2: Get SMTP Credentials
After creating account, you'll see:
- SMTP Host: `smtp.ethereal.email`
- SMTP Port: `587`
- Username: `(your username)`
- Password: `(your password)`

### Step 3: Update .env file
```
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ethereal-username
SMTP_PASS=your-ethereal-password
EMAIL_FROM=MindCare AI <noreply@mindcareai.com>
```

### Step 4: View Sent Emails
- Log into https://ethereal.email
- Click "Inbox" to see all sent verification emails

---

## Option 3: SendGrid (Best for Production Scale)

### Step 1: Create SendGrid Account
1. Go to: https://sendgrid.com (free tier available)
2. Create API Key from Settings → API Keys

### Step 2: Update .env file
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
EMAIL_FROM=MindCare AI <your-verified-email@yourdomain.com>
```

---

## Testing Your Setup

1. Restart the backend:
```bash
cd backend
node server.js
```

2. Register a new user in the app

3. Check the backend console:
   - If configured correctly: You'll see "✅ VERIFICATION EMAIL SENT SUCCESSFULLY" and a preview URL
   - If not configured: You'll see the verification link in the console

4. Click the preview link or copy the verification URL

---

## Troubleshooting

### Gmail: "Less secure app access" error
- You need an App Password, not your regular Gmail password
- Follow the steps above for App Password generation

### Connection timeout
- Check if your firewall allows outgoing SMTP (port 587)
- Try different ports: 465 (SSL) or 587 (TLS)

### Emails not arriving
- Check spam/junk folder
- Verify the email address is correct
- Try Ethereal first for testing
