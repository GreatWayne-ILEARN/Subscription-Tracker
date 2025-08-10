import {Router} from "express";
import authorize from "../middleware/auth.middleware.js";
import {createSubscription, getUserSubscription} from "../controllers/subscription.controller.js";

const subscriptionRouter = new Router();

// BASIC CRUD operations
subscriptionRouter.get('/', (req, res) => res.send({title: 'Get all Subscribers'}))

subscriptionRouter.get('/id:', (req, res) => res.send({title: 'Get Subscription detail'}))

subscriptionRouter.post('/', authorize ,createSubscription)

subscriptionRouter.put('/id:', (req, res) => res.send({title: 'Update a subscription detail'}))

subscriptionRouter.delete('/:id', (req, res) => res.send({title: 'Delete a subscription'}))

// GET a SUBSCRIPTION BELONGING TO A CERTAIN USER
subscriptionRouter.get('/user/:id', authorize, getUserSubscription)

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: 'Cancel Subscription detail'}))

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: 'Get upcoming renewals'}))

export default subscriptionRouter;