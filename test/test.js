const { FeatureMatrix } = require('./index');
const featureClient = new FeatureMatrix({
    appKey: '932b103a-97a0-4f78-b97f-b010b71a7456',
    envKey: '3f19998a-b8df-42d6-b7ce-edf9d0cc4d99'
});

featureClient.on('ready', () => {
    const features = featureClient.getFeatures();
    console.log(features);
    const k = featureClient.getFeatureState('feat');
    console.log(k);
});