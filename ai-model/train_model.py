import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest

# Charger le dataset
df = pd.read_csv("dataset.csv")
features = ["temperature", "vibration", "pressure"]
X = df[features]

# Entraîner Isolation Forest
model = IsolationForest(n_estimators=100, contamination=0.1, random_state=42)
model.fit(X)

# Sauvegarder le modèle
joblib.dump(model, "model.pkl")
print("Modèle entraîné et sauvegardé -> model.pkl")