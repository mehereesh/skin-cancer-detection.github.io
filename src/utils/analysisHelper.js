import { LESION_TYPES, SEVERITY_LEVELS } from './classificationTypes';

export function analyzePredictions(predictions) {
  // Find the highest probability prediction
  const topPrediction = predictions[0];
  
  // Get the lesion type details
  const lesionType = findLesionType(topPrediction.className);
  
  // Determine if it's potentially cancerous
  const isCancerous = lesionType.type === SEVERITY_LEVELS.MALIGNANT;
  
  // Calculate confidence level (0-1)
  const confidence = topPrediction.probability;
  
  // Determine stage if applicable
  const stage = determineStage(lesionType, confidence);
  
  // Generate recommendation based on type and confidence
  const recommendation = generateRecommendation(lesionType, confidence);
  
  return {
    lesionType,
    isCancerous,
    confidence,
    stage,
    recommendation
  };
}

function findLesionType(className) {
  // Find matching lesion type from our defined types
  const matchingType = Object.values(LESION_TYPES).find(type => 
    type.name.toLowerCase() === className.toLowerCase()
  );
  
  return matchingType || LESION_TYPES.NEVUS; // Default to nevus if no match found
}

function determineStage(lesionType, confidence) {
  if (lesionType.commonStages.length === 0) {
    return null;
  }
  
  // Simple staging logic based on confidence
  // Note: This is a simplified example - real staging requires medical expertise
  if (confidence > 0.9) {
    return lesionType.commonStages[Math.min(3, lesionType.commonStages.length - 1)];
  } else if (confidence > 0.7) {
    return lesionType.commonStages[Math.min(2, lesionType.commonStages.length - 1)];
  } else if (confidence > 0.1) {
    return lesionType.commonStages[Math.min(1, lesionType.commonStages.length - 1)];
  } else {
    return lesionType.commonStages[0];
  }
}

function generateRecommendation(lesionType, confidence) {
  const urgencyLevel = determineUrgencyLevel(lesionType, confidence);
  
  switch (urgencyLevel) {
    case 'immediate':
      return 'Seek immediate medical attention. This analysis suggests a high probability of malignant cancer.';
    case 'urgent':
      return 'Schedule an appointment with a dermatologist as soon as possible for proper evaluation.';
    case 'monitor':
      return 'Monitor for changes and schedule a routine check-up with a healthcare provider.';
    default:
      return 'Continue regular skin checks and practice sun protection.';
  }
}

function determineUrgencyLevel(lesionType, confidence) {
  if (lesionType.type === SEVERITY_LEVELS.MALIGNANT && confidence > 0.7) {
    return 'immediate';
  } else if (lesionType.type === SEVERITY_LEVELS.MALIGNANT || 
            (lesionType.type === SEVERITY_LEVELS.SUSPICIOUS && confidence > 0.8)) {
    return 'urgent';
  } else if (lesionType.type === SEVERITY_LEVELS.SUSPICIOUS || confidence > 0.9) {
    return 'monitor';
  }
  return 'routine';
}