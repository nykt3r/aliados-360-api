"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = notFoundMiddleware;
exports.errorMiddleware = errorMiddleware;
const app_error_1 = require("../../../shared/errors/app.error");
function notFoundMiddleware(_req, res) {
    res.status(404).json({
        message: "Route not found",
    });
}
function errorMiddleware(error, _req, res, _next) {
    if (error instanceof app_error_1.AppError) {
        res.status(error.statusCode).json({
            message: error.message,
        });
        return;
    }
    if (error instanceof SyntaxError && error.status === 400 && error.type === "entity.parse.failed") {
        res.status(400).json({
            message: "Malformed JSON body",
        });
        return;
    }
    console.error(error);
    res.status(500).json({
        message: "Internal server error",
    });
}
