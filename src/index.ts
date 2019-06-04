import WebSocket, { Data } from 'ws';
import { FeatureMatrixBase, Options, FeatureStorage } from 'featurematrix';
import { MemoryStorage } from './memory-storage';

export class FeatureMatrix extends FeatureMatrixBase {
    private options: Options;

    constructor(options: Options) {
        super();
        this.featureStorage = new FeatureStorage(new MemoryStorage());
        
        if (!options || !options.appKey || !options.envKey) {
            throw new Error('appKey and envKey are required');
        }

        this.options = options;
        this.connect();
    }

    connect() {
        const { appKey, envKey } = this.options;
        const ws = new WebSocket(`wss://live.featurematrix.io?envKey=${envKey}&appKey=${appKey}`);
        this.initListeners(ws);
    }

    initListeners(ws: WebSocket) {
        ws.addEventListener('open', () => {
            super.onConnect();
        });

        ws.on('message', (data: Data) => {
            const parsedMessage = JSON.parse(data.toString());
            super.onMessage(parsedMessage);
        });

        ws.on('error', (err) => {
            console.error(err);
        });

        ws.on('close', (code, reason)=> {
            super.onClose();

            try {
                console.error(JSON.parse(reason));
            } catch (err) {
                console.error('Socket closed unexpectedly');
            }
        });
    }
}