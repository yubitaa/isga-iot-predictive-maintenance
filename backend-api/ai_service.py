import joblib
import numpy as np
import os

# Chemin vers le modèle .pkl du Rôle 2 (Lalaoui)
MODEL_PATH = "../ai-model/model.pkl"


def load_model():
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    return None


model = load_model()


def predict_status(temperature: float, vibration: float, pressure: float) -> str:
    # Si le modèle .pkl n'est pas encore prêt (Lalaoui pas fini)
    # On utilise des règles simples pour tester
    if model is None:
        if vibration > 7.0 or temperature > 90.0:
            return "CRITICAL"
        elif vibration > 4.0 or temperature > 70.0:
            return "WARNING"
        else:
            return "NORMAL"

    # Si le modèle est prêt
    data = np.array([[temperature, vibration, pressure]])
    prediction = model.predict(data)
    if prediction[0] == -1:
        return "CRITICAL"
    else:
        return "NORMAL"