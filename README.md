# Gajna Website
## Setup Instructions
### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
EMAIL_DRY_RUN=true

NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```
### Setting up reCAPTCHA

The contact forms use Google reCAPTCHA v2 for spam protection. Follow these steps to set up your reCAPTCHA keys:

1. Go to the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Sign in with your Google account
3. Click on the "+" button to add a new site
4. Choose "reCAPTCHA v2" and select "I'm not a robot" Checkbox
5. Add your domain(s) to the list of domains (e.g., localhost, your-domain.com)
6. Accept the Terms of Service and click "Submit"
7. You will receive a Site Key and Secret Key
8. Add these keys to your `.env.local` file:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
   RECAPTCHA_SECRET_KEY=your-secret-key
   ```
## Development

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Github push - git push gajnaoverseas main    