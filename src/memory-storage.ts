import { Storage, StoredFeature } from 'featurematrix';

export class MemoryStorage implements Storage {
    features: StoredFeature[] = [];

    persistFeatures(features: StoredFeature[]) {
        this.features = features;
    }

    getFeatures(): StoredFeature[] {
        return this.features;
    }
}