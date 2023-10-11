import express from "express";
import commonStudentsRouter from "./common-students.js"
import registerRouter from "./register.js";
import suspendRouter from "./suspend.js";
import unsuspendRouter from "./unsuspend.js";
import retrieveForNotificationsRouter from "./retrieve-for-notifications.js";
import ErrorHandler from "../../middlewares/errorHandler.js";

const apiRouter = express.Router();

apiRouter.use('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    if(req.method === 'POST') {
        const contentType =  req.headers['content-type'];
        if (!contentType || !req.is(contentType)) {
            res.status(400).json({error: 'content-type: application/json headers is missing'});
        } 
    }
    next();
});

apiRouter.use('/register', registerRouter);
apiRouter.use('/commonstudents', commonStudentsRouter);
apiRouter.use('/suspend', suspendRouter);
apiRouter.use('/unsuspend', unsuspendRouter);
apiRouter.use('/retrievefornotifications', retrieveForNotificationsRouter);

// Middlerware ErrorHandler 
apiRouter.use(ErrorHandler)

export default apiRouter
