"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const featurematrix_1 = require("featurematrix");
const memory_storage_1 = require("./memory-storage");
class FeatureMatrix extends featurematrix_1.FeatureMatrixBase {
    constructor(options) {
        super();
        this.featureStorage = new featurematrix_1.FeatureStorage(new memory_storage_1.MemoryStorage());
        if (!options || !options.appKey || !options.envKey) {
            throw new Error('appKey and envKey are required');
        }
        this.init(options);
    }
    init(options) {
        const { appKey, envKey } = options;
        const ws = new ws_1.default(`ws://localhost:8000/live?envKey=${envKey}&appKey=${appKey}`);
        this.initListeners(ws);
    }
    initListeners(ws) {
        ws.on('message', (data) => {
            const parsedMessage = JSON.parse(data.toString());
            super.onMessage(parsedMessage);
        });
        ws.on('error', (err) => {
            console.error(err);
        });
        ws.on('close', (code, reason) => {
            try {
                console.error(JSON.parse(reason));
            }
            catch (err) {
                console.error('Socket closed unexpectedly');
            }
        });
    }
}
exports.FeatureMatrix = FeatureMatrix;
