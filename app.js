import express from "express";
import apiRouter from "./routes/api/index.js"

const createServer = () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    
    app.use('/api', apiRouter);

    return app;
}

export default createServer;