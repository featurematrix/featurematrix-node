import { Storage, StoredFeature } from 'featurematrix';
export declare class MemoryStorage implements Storage {
    features: StoredFeature[];
    persistFeatures(features: StoredFeature[]): void;
    getFeatures(): StoredFeature[];
}
