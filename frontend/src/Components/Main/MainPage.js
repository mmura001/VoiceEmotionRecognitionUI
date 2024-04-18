import React, { useState } from 'react';
import axios from 'axios';
import MicRecorder from 'mic-recorder-to-mp3';
import { saveAs } from 'file-saver';

const MainPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : '');
  };

  const handleUpload = async () => {
    // Check if a file is selected or recording is in progress
    if (!selectedFile && !isRecording) {
      alert('Please select a file or record an audio.');
      return;
    }

    // If recording is in progress, stop the recording first
    if (isRecording) {
      stopRecording();
    }

    // Create FormData object and append the selected file
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Send the file to the backend for processing
      const response = await axios.post('http://127.0.0.1:5000/predict-emotion', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Set the prediction based on the response from the backend
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  const startRecording = () => {
    const newRecorder = new MicRecorder({ bitRate: 128 });
    newRecorder.start().then(() => {
      setRecorder(newRecorder);
      setIsRecording(true);
    }).catch((error) => {
      console.error('Error starting recording:', error);
      alert('An error occurred while starting recording.');
    });
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop().getMp3().then(([buffer, blob]) => {
        // Set the selected file and file name
        setSelectedFile(blob);
        setFileName('recorded.mp3');
        setIsRecording(false);

        // Send the MP3 file to the backend
        sendFileToBackend(blob);
      }).catch((error) => {
        console.error('Error stopping recording:', error);
        alert('An error occurred while stopping recording.');
      });
    } else {
      console.warn('Recorder is not currently recording.');
    }
  };

  const sendFileToBackend = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict-emotion', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  const generateFileName = (extension) => {
    // Generate a unique file name based on timestamp
    const timestamp = Date.now();
    return `recorder_${timestamp}.${extension}`;
};

  return (
    <div className="Main">
  <h1>Start Recording or Upload a file</h1>
  <br/>
  
  <div className="center-container">
    <div className="file-upload">
      <input type="file" id="file" onChange={handleFileChange} accept="audio/*" />
      <label htmlFor="file">Choose File</label>
      {fileName && <p>Selected File: {fileName}</p>}
    </div>
  </div>
  
  
  <div className="button-container1">
    <button className="record-button" onClick={startRecording} disabled={isRecording}>Record Audio</button>
    <button className="stop-button" onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
  </div>
  
  <div className="button-container2">
    <button className="upload-button" onClick={handleUpload}>Upload Audio</button>
  </div>

  <br/>
  {prediction && (
    <div className="prediction">
      <h2>Prediction</h2>
      <p className="prediction-result">{prediction}</p>
    </div>
  )}
</div>

  );
};

export default MainPage;