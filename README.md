# FeatureMatrix Node
FeatureMatrix Node Client  
If features are toggled on/off, client will be updated in realtime.  
No need to rebuild or redeploy the app!  
Built on [FeautureMatrix JS](https://github.com/featurematrix/featurematrix-js) base.

## Installation

```bash
npm i featurematrix-node
```

## Getting started
Signup if you don't have an account yet at https://app.featurematrix.io/signup  
Get familiar with concepts at https://docs.featurematrix.io

## Usage
Start by importing `FeatureMatrix` class and create an instance.  
Then initialize the instance with `appKey` and `envKey` which can be found at
https://app.featurematrix.io/apps and
https://app.featurematrix.io/environments

```js
import { FeatureMatrix } from 'featurematrix-js';

const featureClient = new FeatureMatrix();

featureClient.init({
    appKey: 'ef445c2b-d4b4-43bc-b79a-7956baeef34a',
    envKey: '4306148c-3707-4b2d-99aa-4390f09b4f5a'
});
```

## Events
`featureClient` exposes two events to subscribe to: `ready` and `update`.  
After the client has been initialized and has successfully open a connection to FeatureMatrix backend `ready` event will be emitted.  
And on each feature update which is made available to current app an `update` will be emitted with the latest state of the feature.


```js
featureClient.on('ready', () => {
    const featureKeys = featureClient.getFeatures();
});

featureClient.on('update', feature => {
    const newFeatureState = featureClient.getFeatureState(feature.key);
});
```

## API

```ts
type EventType = 'ready' | 'update';
```

```ts
interface Subscription {
    unsubscribe: () => void;
}
```

### ```on(eventType: EventType, callback: (...args: any[]) => void): Subscription```
Subscribe to either `ready` or `update` events.

### ```getFeatureState(featureKey: string): boolean```
Given the key of a feature, returns the feature state as boolean.

### ```getFeatures(): string[]```
Returns the list of available feature keys to current app.
