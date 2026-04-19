from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from database import Base

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    machine_id = Column(String, index=True)
    temperature = Column(Float)
    vibration = Column(Float)
    pressure = Column(Float)
    status = Column(String)  # NORMAL / WARNING / CRITICAL
    timestamp = Column(DateTime, default=datetime.utcnow)