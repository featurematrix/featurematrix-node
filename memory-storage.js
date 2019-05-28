"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryStorage {
    constructor() {
        this.features = [];
    }
    persistFeatures(features) {
        this.features = features;
    }
    getFeatures() {
        return this.features;
    }
}
exports.MemoryStorage = MemoryStorage;
