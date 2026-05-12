import pandas as pd
import numpy as np

np.random.seed(42)
n_normal = 4500
n_anomaly = 500

# Données normales
normal_data = {
    "temperature": np.random.normal(65, 5, n_normal),
    "vibration":   np.random.normal(2.0, 0.3, n_normal),
    "pressure":    np.random.normal(1.1, 0.1, n_normal),
    "label": ["NORMAL"] * n_normal
}

# Données anormales (pannes : vibrations très hautes)
anomaly_data = {
    "temperature": np.random.normal(90, 8, n_anomaly),
    "vibration":   np.random.normal(8.5, 1.0, n_anomaly),
    "pressure":    np.random.normal(1.8, 0.2, n_anomaly),
    "label": ["CRITICAL"] * n_anomaly
}

df = pd.concat([pd.DataFrame(normal_data), pd.DataFrame(anomaly_data)])
df = df.sample(frac=1).reset_index(drop=True)
df.to_csv("dataset.csv", index=False)
print(f"Dataset créé : {len(df)} lignes -> dataset.csv")