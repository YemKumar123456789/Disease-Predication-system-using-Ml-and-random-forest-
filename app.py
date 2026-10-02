from flask import Flask, request, jsonify
from flask_cors import CORS

import pickle
import numpy as np


# ==========================================
# CREATE FLASK APP
# ==========================================

app = Flask(__name__)

CORS(app)


# ==========================================
# LOAD TRAINED MODEL
# ==========================================

with open("model/disease_model.pkl", "rb") as file:
    model = pickle.load(file)


with open("model/label_encoder.pkl", "rb") as file:
    label_encoder = pickle.load(file)


with open("model/symptom_list.pkl", "rb") as file:
    symptom_list = pickle.load(file)


# Create symptom → index mapping

symptom_index = {
    symptom: index
    for index, symptom in enumerate(symptom_list)
}


# ==========================================
# HOME ROUTE
# ==========================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "MediPredict ML API is running"
    })


# ==========================================
# PREDICTION ROUTE
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        symptoms = data.get("symptoms", [])


        if not symptoms:

            return jsonify({
                "error": "No symptoms provided"
            }), 400


        # Create feature vector

        features = np.zeros(
            len(symptom_list),
            dtype=int
        )


        # Convert incoming symptoms

        for symptom in symptoms:

            cleaned_symptom = (
                symptom
                .strip()
                .lower()
                .replace(" ", "_")
            )


            if cleaned_symptom in symptom_index:

                index = symptom_index[cleaned_symptom]

                features[index] = 1


        # Reshape for model

        features = features.reshape(1, -1)


        # Predict

        prediction = model.predict(features)[0]


        # Convert encoded disease back to name

        disease = label_encoder.inverse_transform(
            [prediction]
        )[0]


        # Get prediction probabilities

        probabilities = model.predict_proba(features)[0]

        confidence = float(
            np.max(probabilities) * 100
        )


        return jsonify({

            "disease": disease,

            "confidence": round(
                confidence,
                2
            ),

            "symptoms": symptoms

        })


    except Exception as error:

        return jsonify({

            "error": str(error)

        }), 500


# ==========================================
# START SERVER
# ==========================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )