"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueId = void 0;
const node_crypto_1 = require("node:crypto");
class UniqueId {
    value;
    constructor(value) {
        this.value = value ?? (0, node_crypto_1.randomUUID)();
    }
    getValue() {
        return this.value;
    }
}
exports.UniqueId = UniqueId;
