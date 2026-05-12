import joblib
import pandas as pd

model = joblib.load("model.pkl")

def predict(temperature, vibration, pressure):
    # On utilise un DataFrame avec les noms de colonnes exacts
    data = pd.DataFrame([[temperature, vibration, pressure]],
                        columns=["temperature", "vibration", "pressure"])
    result = model.predict(data)
    return "CRITICAL" if result[0] == -1 else "NORMAL"

# Test 1 : valeur normale
print("Test normal :", predict(65, 2.0, 1.1))    # → NORMAL

# Test 2 : valeur extrême
print("Test critique :", predict(92, 10.0, 1.9)) # → CRITICAL