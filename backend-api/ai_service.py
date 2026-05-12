import joblib
import numpy as np
import os

# Chemin vers le modèle .pkl de Lalaoui
# On cherche le dossier ai-model à la racine du projet
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "ai-model", "model.pkl")

def load_model():
    if os.path.exists(MODEL_PATH):
        try:
            return joblib.load(MODEL_PATH)
        except:
            return None
    return None

model = load_model()

def predict_status(temperature: float, vibration: float, pressure: float) -> str:
    # Mode fallback si le modèle n'est pas chargé
    if model is None:
        if vibration > 7.0 or temperature > 90.0:
            return "CRITICAL"
        elif vibration > 4.0 or temperature > 70.0:
            return "WARNING"
        else:
            return "NORMAL"

    # Utilisation du vrai modèle de Lalaoui
    try:
        data = np.array([[temperature, vibration, pressure]])
        prediction = model.predict(data)
        return "CRITICAL" if prediction[0] == -1 else "NORMAL"
    except:
        return "ERROR_AI"