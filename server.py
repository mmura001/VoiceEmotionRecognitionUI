from flask import Flask, request, jsonify
from flask_cors import CORS
from model_extraction import SpeechEmotionAnalyzer
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


UPLOAD_FOLDER = 'allSaved'
ALLOWED_EXTENSIONS = {'wav'}

analyzer = SpeechEmotionAnalyzer('modelForPrediction1.sav')

if not os.path.exists(UPLOAD_FOLDER):
    print("does not exists")
    os.makedirs(UPLOAD_FOLDER)

@app.route('/predict-emotion', methods=['POST'])
def predict_emotion():
    # Check if the POST request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    # If user does not select file, browser also submits an empty part without filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # file.save(os.path.join(UPLOAD_FOLDER, file.filename))
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    prediction = analyzer.predict_emotion(file_path)
    # return "test"
    print("prediction:", prediction)
    return jsonify({'prediction': prediction})


if __name__ == '__main__':
    app.run(debug=True)
