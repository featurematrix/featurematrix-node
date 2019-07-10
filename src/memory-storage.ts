import { Storage, StoredFeature } from 'featurematrix-js';

export class MemoryStorage implements Storage {
    features: StoredFeature[] = [];

    persistFeatures(features: StoredFeature[]) {
        this.features = features;
    }

    getFeatures(): StoredFeature[] {
        return this.features;
    }

    getFeature(featureKey: string): StoredFeature {
        return this.features.find(f => f.key === featureKey);
    } 
}