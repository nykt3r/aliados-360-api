"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
async function main() {
    const invalidUpdate = await (0, supertest_1.default)(app_1.app)
        .put("/api/update/partners/1a2b3c4d-0001")
        .send({});
    const missingPartner = await (0, supertest_1.default)(app_1.app)
        .get("/api/getbyid/partners/does-not-exist");
    const malformedJson = await (0, supertest_1.default)(app_1.app)
        .put("/api/update/partners/1a2b3c4d-0001")
        .set("Content-Type", "application/json")
        .send('{"name":');
    console.log(JSON.stringify({
        invalidUpdate: {
            status: invalidUpdate.status,
            body: invalidUpdate.body,
        },
        missingPartner: {
            status: missingPartner.status,
            body: missingPartner.body,
        },
        malformedJson: {
            status: malformedJson.status,
            body: malformedJson.body,
        },
    }));
}
void main();
