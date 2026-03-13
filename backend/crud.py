from sqlalchemy.orm import Session
from . import models, schemas

def obtener_viviendas(db: Session):
    return db.query(models.Vivienda).all()

def crear_vivienda(db: Session, vivienda: schemas.ViviendaCreate):
    db_vivienda = models.models.Vivienda(**vivienda.model_dump())
    db.add(db_vivienda)
    db.commit()
    db.refresh(db_vivienda)
    return db_vivienda