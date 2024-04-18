import librosa
import numpy as np
import pickle

class SpeechEmotionAnalyzer:
    def __init__(self, model_filename):
        self.model_filename = model_filename
        self.loaded_model = self.load_model()

    def load_model(self):
        return pickle.load(open(self.model_filename, 'rb'))

    def extract_feature(self, audio_file, mfcc=True, chroma=True, mel=True):
        X, sr = librosa.load(audio_file, sr=None)  # Load audio file with its sampling rate
        result = []
        if mfcc:
            mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sr, n_mfcc=40).T, axis=0)
            result.append(mfccs)
        if chroma:
            chroma = np.mean(librosa.feature.chroma_stft(y=X, sr=sr).T, axis=0)
            result.append(chroma)
        if mel:
            mel = np.mean(librosa.feature.melspectrogram(y=X, sr=sr).T, axis=0)
            result.append(mel)
        return np.hstack(result) if len(result) > 0 else None

    def predict_emotion(self, audio_file):
        feature = self.extract_feature(audio_file, mfcc=True, chroma=True, mel=True)
        if feature is not None:
            feature = feature.reshape(1, -1)
            prediction = self.loaded_model.predict(feature)
            print(prediction)
            return prediction[0]  # Return the predicted emotion label
        else:
            return "Error: Unable to extract features from audio file."


filename = 'modelForPrediction1.sav'
# analyzer = SpeechEmotionAnalyzer(filename)
# prediction = analyzer.predict_emotion("/Users/manjushreemuralidhara/Masters/HCI/Speech-Emotion-Analyzer/Audio_Speech_Actors_01-24/Actor_01/03-01-02-02-01-01-01.wav")
# print(prediction)