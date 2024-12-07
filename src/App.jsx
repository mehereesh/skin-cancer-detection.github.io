import React, { useState, useEffect, useRef } from 'react';
import { loadModel, classifyImage } from './utils/modelLoader';
import { createTensorCleanup, logMemory } from './utils/tensorflowHelper';
import ImageUpload from './components/ImageUpload';
import Results from './components/Results';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [model, setModel] = useState(null);
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const imageRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const cleanup = createTensorCleanup();

    const initModel = async () => {
      try {
        setIsModelLoading(true);
        const loadedModel = await loadModel();
        if (mounted) {
          setModel(loadedModel);
          setError(null);
          logMemory();
        }
      } catch (err) {
        if (mounted) {
          console.error('Model loading error:', err);
          setError('Failed to load the analysis model. Please check your internet connection and try refreshing the page.');
        }
      } finally {
        if (mounted) {
          setIsModelLoading(false);
        }
      }
    };

    initModel();

    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  const handleImageUpload = async (imageData) => {
    setImage(imageData);
    setPredictions(null);
    setError(null);

    if (!model) {
      setError('Model not loaded yet. Please wait and try again.');
      return;
    }

    const img = new Image();
    img.src = imageData;
    img.onload = async () => {
      setIsAnalyzing(true);
      try {
        const results = await classifyImage(model, img);
        setPredictions(results);
        logMemory();
      } catch (err) {
        console.error('Classification error:', err);
        setError(err.message || 'Failed to analyze the image. Please try again.');
      } finally {
        setIsAnalyzing(false);
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Skin Lesion Analysis
          </h1>
          <p className="mt-2 text-gray-600">
            Upload a photo of the skin lesion for preliminary analysis
          </p>
        </div>

        {isModelLoading ? (
          <div className="mt-8 text-center">
            <LoadingSpinner />
            <p className="mt-2 text-gray-600">Loading analysis model...</p>
          </div>
        ) : (
          <ImageUpload onImageUpload={handleImageUpload} />
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {image && (
          <div className="mt-6">
            <img
              ref={imageRef}
              src={image}
              alt="Uploaded skin lesion"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {isAnalyzing && (
          <div className="mt-6">
            <LoadingSpinner />
          </div>
        )}
        
        <Results predictions={predictions} />

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            This tool is for educational purposes only and should not be used as a substitute
            for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;