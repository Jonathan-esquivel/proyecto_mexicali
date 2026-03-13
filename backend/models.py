from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from .database import Base

class Vivienda(Base):
    __tablename__ = "viviendas"

    id = Column(Integer, primary_key=True, index=True)
    direccion = Column(String, nullable=False)
    latitud = Column(Float, nullable=False)
    longitud = Column(Float, nullable=False)
    estado = Column(String, default="Vandalizada")
    fecha_registro = Column(DateTime, default=datetime.utcnow)