# Subscription Tracker API

A Node.js and Express REST API project for managing subscriptions, with JWT-based authentication, MongoDB persistence, and renewal-reminder workflows.

> **Status:** Work in progress. Subscription creation and user-specific retrieval are implemented; several other routes currently return placeholder responses. Reminder scheduling is implemented in code but has not been verified end-to-end here.

## Tech stack

- **Runtime / API:** Node.js, Express, JavaScript (ES modules)
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs
- **Protection:** Arcjet middleware
- **Workflows:** Upstash Workflow, Day.js
- **Email:** Nodemailer

## Implemented functionality

- Register and sign in users with hashed passwords and JWTs.
- Protect selected endpoints with bearer-token authorization.
- Create subscriptions linked to the authenticated user.
- Retrieve subscriptions belonging to a specific authenticated user.
- Store subscription details such as price, currency, billing frequency, category, payment method, and renewal date.
- Calculate an initial renewal date when omitted, using approximate day-based billing intervals.
- Trigger an Upstash workflow after subscription creation, with reminder steps scheduled for 7, 5, 2, and 1 days before renewal.
- Prepare reminder emails through Nodemailer.

## API endpoints

| Method | Endpoint | Status |
| --- | --- | --- |
| POST | `/api/v1/auth/sign-up` | Implemented |
| POST | `/api/v1/auth/sign-in` | Implemented |
| POST | `/api/v1/auth/sign-out` | Handler not implemented |
| POST | `/api/v1/subscriptions` | Implemented; requires bearer token |
| GET | `/api/v1/subscriptions/user/:id` | Implemented; requires bearer token and matching user |
| POST | `/api/v1/workflows/subscription/reminder` | Workflow handler present |
| GET/PUT/DELETE | Other subscription endpoints | Placeholder responses |
| POST/PUT/DELETE | User-management endpoints | Placeholder responses |

## Getting started

**Requirements:** Node.js, npm, MongoDB, and credentials for the external services you intend to use.

```bash
git clone https://github.com/GreatWayne-ILEARN/Subscription-Tracker.git
cd Subscription-Tracker
npm install
```

Create `.env.development.local` in the repository root with values for the environment variables referenced in `config/env.js`:

```dotenv
PORT=3000
NODE_ENV=development
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
QSTASH_TOKEN=your_upstash_token
QSTASH_URL=your_upstash_url
SERVER_URL=your_publicly_reachable_server_url
EMAIL_PASSWORD=your_email_app_password
```

> The email sender address is currently hard-coded in `config/nodemailer.js`. Update it for your own environment. Keep secrets out of version control. MongoDB transactions used during registration require a suitable MongoDB deployment (such as a replica set).

Run the development server:

```bash
npm run dev
```

Or run without the file watcher:

```bash
npm start
```

The app listens on the configured `PORT`. A `GET /` request returns a welcome message.

## Project structure

```text
config/       Environment and third-party service setup
controllers/  Authentication, subscription, user, and workflow handlers
database/     MongoDB connection
middleware/   Authorization, security, and error handling
models/       Mongoose models
routes/       API routes
utils/        Email templates and sending helpers
app.js        Express application entry point
```

## Known limitations and next steps

- Complete subscription CRUD, cancellation, and upcoming-renewals endpoints.
- Implement sign-out behavior if session invalidation is required.
- Add request validation, automated tests, and API examples.
- Review user-data exposure in authentication responses and error handling.
- Improve billing-period calculations for calendar months and years.
- Verify the Upstash workflow and reminder email delivery end-to-end.

## Author

[GreatWayne-ILEARN](https://github.com/GreatWayne-ILEARN)
