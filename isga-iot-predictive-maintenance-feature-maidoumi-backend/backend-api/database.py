import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# --- CONFIGURATION DE LA CONNEXION ---

# 1. Récupération de l'hôte (localhost par défaut, sera modifié par Docker plus tard)
# C'est la modification demandée par le chef
DB_HOST = os.getenv("DB_HOST", "localhost")

# 2. Vos identifiants PostgreSQL (À MODIFIER SELON VOTRE PC)
DB_NAME = "votre_nom_de_bdd"  # Remplacez par le nom de votre base dans pgAdmin
DB_USER = "postgres"          # Votre utilisateur (souvent postgres)
DB_PASS = "votre_mot_de_passe" # Votre mot de passe PostgreSQL

# 3. Construction de l'URL de connexion
# Format: postgresql://utilisateur:motdepasse@hote:port/nom_bdd
SQLALCHEMY_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:5432/{DB_NAME}"

# --- INITIALISATION DE SQLALCHEMY ---

# Création de l'moteur de base de données
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Création de la fabrique de sessions (utilisée dans main.py et par les threads MQTT)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Classe de base pour vos modèles (SensorData, etc.)
Base = declarative_base()

# --- DÉPENDANCE POUR FASTAPI ---

def get_db():
    """
    Fonction utilitaire pour injecter la session de base de données 
    dans les routes FastAPI (Depends)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()