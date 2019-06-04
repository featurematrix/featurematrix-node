import WebSocket from 'ws';
import { FeatureMatrixBase, Options } from 'featurematrix-js';
export declare class FeatureMatrix extends FeatureMatrixBase {
    private options;
    constructor(options: Options);
    connect(): void;
    initListeners(ws: WebSocket): void;
}
