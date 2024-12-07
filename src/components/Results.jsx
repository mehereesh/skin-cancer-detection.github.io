import React from 'react';
import { analyzePredictions } from '../utils/analysisHelper';

export default function Results({ predictions }) {
  if (!predictions || predictions.length === 0) return null;

  const analysis = analyzePredictions(predictions);
  const { lesionType, isCancerous, confidence, stage, recommendation } = analysis;

  return (
    <div className="mt-6 bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      
      {/* Primary Classification */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 font-medium">Identified as:</span>
          <span className={`font-semibold ${getTypeColor(lesionType.type)}`}>
            {lesionType.name}
          </span>
        </div>
        <p className="text-sm text-gray-600">{lesionType.description}</p>
      </div>

      {/* Classification Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded">
          <span className="text-sm text-gray-600">Type:</span>
          <p className="font-medium">{lesionType.type}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="text-sm text-gray-600">Risk Level:</span>
          <p className="font-medium">{lesionType.riskLevel}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="text-sm text-gray-600">Confidence:</span>
          <p className="font-medium">{(confidence * 100).toFixed(1)}%</p>
        </div>
        {stage && (
          <div className="bg-gray-50 p-3 rounded">
            <span className="text-sm text-gray-600">Potential Stage:</span>
            <p className="font-medium">{stage}</p>
          </div>
        )}
      </div>

      {/* Additional Predictions */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Alternative Possibilities:</h3>
        <div className="space-y-2">
          {predictions.slice(1, 4).map((prediction, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{prediction.className}</span>
              <span className="font-medium">
                {(prediction.probability * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 mb-1">Recommendation:</h3>
        <p className="text-sm text-blue-700">{recommendation}</p>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-md">
        <p className="text-sm text-yellow-700">
          <strong>Important:</strong> This is an AI-assisted analysis for educational purposes only. 
          It should not be used as a substitute for professional medical diagnosis. 
          Always consult qualified healthcare professionals for proper evaluation and diagnosis.
        </p>
      </div>
    </div>
  );
}

function getTypeColor(type) {
  switch (type) {
    case 'Malignant':
      return 'text-red-600';
    case 'Suspicious':
      return 'text-yellow-600';
    case 'Benign':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
}