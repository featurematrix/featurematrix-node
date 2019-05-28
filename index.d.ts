import WebSocket from 'ws';
import { FeatureMatrixBase, Options } from 'featurematrix';
export declare class FeatureMatrix extends FeatureMatrixBase {
    constructor(options: Options);
    private init;
    initListeners(ws: WebSocket): void;
}
