import * as tf from '@tensorflow/tfjs';
import { LESION_TYPES } from './classificationTypes';

async function initializeTensorFlow() {
  try {
    await tf.ready();
    await tf.setBackend('webgl');
    console.log('TensorFlow.js initialized successfully');
  } catch (error) {
    console.error('Error initializing TensorFlow.js:', error);
    throw new Error('Failed to initialize TensorFlow.js');
  }
}

export async function loadModel() {
  try {
    await initializeTensorFlow();
    const model = await tf.loadLayersModel(
      'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'
    );
    console.log('Model loaded successfully');
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw new Error('Failed to load the neural network model. Please check your internet connection and try again.');
  }
}

export async function preprocessImage(imageElement) {
  try {
    const tensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([224, 224])
      .toFloat();

    const offset = tf.scalar(127.5);
    const normalized = tensor.sub(offset).div(offset);
    const batched = normalized.expandDims(0);
    
    return batched;
  } catch (error) {
    console.error('Error preprocessing image:', error);
    throw new Error('Failed to process the image');
  }
}

export async function classifyImage(model, imageElement) {
  let imageTensor = null;
  try {
    imageTensor = await preprocessImage(imageElement);
    const predictions = await model.predict(imageTensor).data();
    
    // Map the predictions to our defined lesion types
    const mappedPredictions = Object.values(LESION_TYPES).map((lesionType, index) => ({
      className: lesionType.name,
      probability: predictions[index] || 0
    }));

    // Sort by probability and get top 5
    return mappedPredictions
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 5);
  } catch (error) {
    console.error('Error classifying image:', error);
    throw new Error('Failed to analyze the image. Please try uploading a different image.');
  } finally {
    if (imageTensor) {
      imageTensor.dispose();
    }
  }
}