import { isHttpError } from "http-errors";

export const errorHandler = (error, req, res, next) => {
    if (isHttpError(error)) {
        return res.status(error.status).json({
            status: error.status,
            errorMessage: error.message,
            id: req.id,
        });
    }
    res.status(500).json({
        status: 500,
        errorMessage: error.message,
        id: req.id,
    });
};
