import * as tf from '@tensorflow/tfjs';

export function disposeTensors(tensors) {
  if (Array.isArray(tensors)) {
    tensors.forEach(tensor => {
      if (tensor && tensor.dispose) {
        tensor.dispose();
      }
    });
  } else if (tensors && tensors.dispose) {
    tensors.dispose();
  }
}

export function logMemory() {
  const memory = tf.memory();
  console.log('Memory status:', {
    numTensors: memory.numTensors,
    numBytes: memory.numBytes,
    unreliable: memory.unreliable,
    reasons: memory.reasons
  });
}

export function createTensorCleanup() {
  return () => {
    try {
      const memory = tf.memory();
      if (memory.numTensors > 0) {
        tf.disposeVariables();
        console.log('Cleaned up tensors');
      }
    } catch (error) {
      console.error('Error cleaning up tensors:', error);
    }
  };
}