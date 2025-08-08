import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        // Protect this request
        const decision = await aj.protect(req, {requested: 1})


        if (decision.isDenied()) {
            // Reason for the denial
            if (decision.reason.isRateLimit()) return res.status(429).json({ error: 'Rate limit exceeded' });
            if (decision.reason.isBot()) return res.status(403).json({ error: 'Bot detected' });


            res.status(403).json({ error: 'Access denied' });
        }

        next()
    } catch (err) {
        console.log(`Arcjet Middleware Error: ${err}`);
        next(err);
    }
}

export default arcjetMiddleware;