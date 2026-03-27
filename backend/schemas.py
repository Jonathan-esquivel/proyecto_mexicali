from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ViviendaBase(BaseModel):
    direccion: str
    latitud: float
    longitud: float
    estado: str = "Vandalizada"

class ViviendaCreate(ViviendaBase):
    pass

class ViviendaUpdate(ViviendaBase):
    direccion: Optional[str] = None
    latitud: Optional[str] = None
    longitud: Optional[str] = None

class Vivienda(ViviendaBase):
    id: int
    fecha_registro: datetime

    class Config:
        from_attributes = True