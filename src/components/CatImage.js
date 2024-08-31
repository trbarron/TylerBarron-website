import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageDisplay = () => {
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timestamp, setTimestamp] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://nj3ho46btl.execute-api.us-west-2.amazonaws.com/checoStage/checoRestEndpoint/image');
        const data = JSON.parse(response.data.body);
        console.log(data);
        setImageData(data.image);
        setTimestamp(data.timestamp);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred while loading the image');
        setIsLoading(false);
      }
    };

    fetchImage();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading image...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="text-center mb-4">
      {imageData && (
        <div>
          <img
            src={`data:image/jpeg;base64,${imageData}`}
            alt="Cat"
            className="mx-auto max-w-full h-auto"
          />
          <h4>{timestamp}</h4>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;