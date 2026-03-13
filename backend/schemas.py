from pydantic import BaseModel
from datetime import datetime

class ViviendaBase(BaseModel):
    direccion: str
    latitud: float
    longitud: float
    estado: str = "Vandalizada"

class ViviendaCreate(ViviendaBase):
    pass

class Vivienda(ViviendaBase):
    id: int
    fecha_registro: datetime

    class Config:
        from_attributes = True