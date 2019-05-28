import WebSocket, { Data } from 'ws';
import { FeatureMatrixBase, Options, FeatureStorage } from 'featurematrix';
import { MemoryStorage } from './memory-storage';

export class FeatureMatrix extends FeatureMatrixBase {
    constructor(options: Options) {
        super();
        this.featureStorage = new FeatureStorage(new MemoryStorage());
        
        if (!options || !options.appKey || !options.envKey) {
            throw new Error('appKey and envKey are required');
        }

        this.init(options);
    }

    private init(options: Options) {
        const { appKey, envKey } = options;
        const ws = new WebSocket(`ws://localhost:8000/live?envKey=${envKey}&appKey=${appKey}`);
        this.initListeners(ws);
    }

    initListeners(ws: WebSocket) {
        ws.on('message', (data: Data) => {
            const parsedMessage = JSON.parse(data.toString());
            super.onMessage(parsedMessage);
        });

        ws.on('error', (err) => {
            console.error(err);
        });

        ws.on('close', (code, reason)=> {
            try {
                console.error(JSON.parse(reason));
            } catch (err) {
                console.error('Socket closed unexpectedly');
            }
        });
    }
}