"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const partner_routes_1 = __importDefault(require("./infrastructure/api/routes/v1/partner.routes"));
const error_middleware_1 = require("./infrastructure/api/middlewares/error.middleware");
exports.app = (0, express_1.default)();
exports.app.disable("x-powered-by");
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
exports.app.use("/api", partner_routes_1.default);
exports.app.use(error_middleware_1.notFoundMiddleware);
exports.app.use(error_middleware_1.errorMiddleware);
