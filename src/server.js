import express from "express";
import cors from "cors";
import pino from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";
import { ENV_VARS } from "./constants/envVars.js";
import router from "./routers/index.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import { PERMANENT_UPLOAD_DIR } from './constants/index.js';
import { setupSwagger } from './middlewares/swagger.js';

export const startServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());

    app.use(
        pino({
            transport: {
                target: "pino-pretty",
            },
        })
    );
    app.use('/api-docs', setupSwagger());
    app.use('/uploads', express.static(PERMANENT_UPLOAD_DIR));
    app.use(router);
    app.use(errorHandler);
    app.use(notFoundHandler);
    const PORT = getEnvVar(ENV_VARS.PORT, 3000);
    app.listen(PORT, () => {
        console.log(`Server is listening to port ${PORT}`);
    });
};
