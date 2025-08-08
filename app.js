import express from 'express';
import {PORT} from "./config/env.js";
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import workflowRoutes from "./routes/workflow.routes.js";

const app = express();

// Allow app to handle JSON req or handle api calls
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows',workflowRoutes);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to subscription Tracker Api');
})

app.listen(PORT, async () => {
    console.log(`Subscription Tracker Api is running on http://localhost:${PORT}/`);
    await connectToDatabase();
});

export default app;