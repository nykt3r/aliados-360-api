"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
const app_1 = require("./app");
(0, vitest_1.describe)("HTTP error handling", () => {
    (0, vitest_1.it)("returns 404 when a partner does not exist", async () => {
        const response = await (0, supertest_1.default)(app_1.app).get("/api/getbyid/partners/does-not-exist");
        (0, vitest_1.expect)(response.status).toBe(404);
        (0, vitest_1.expect)(response.body).toEqual({
            message: "Partner not found",
        });
    });
    (0, vitest_1.it)("returns 400 when update payload is invalid", async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put("/api/update/partners/1a2b3c4d-0001")
            .send({});
        (0, vitest_1.expect)(response.status).toBe(400);
        (0, vitest_1.expect)(response.body).toEqual({
            message: "At least one field must be provided to update",
        });
    });
    (0, vitest_1.it)("returns 400 for malformed JSON bodies", async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .put("/api/update/partners/1a2b3c4d-0001")
            .set("Content-Type", "application/json")
            .send('{"name":');
        (0, vitest_1.expect)(response.status).toBe(400);
        (0, vitest_1.expect)(response.body).toEqual({
            message: "Malformed JSON body",
        });
    });
});
