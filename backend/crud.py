from sqlalchemy.orm import Session
from . import models, schemas

def obtener_viviendas(db: Session):
    return db.query(models.Vivienda).all()

def crear_vivienda(db: Session, vivienda: schemas.ViviendaCreate):
    db_vivienda = models.Vivienda(**vivienda.model_dump())
    db.add(db_vivienda)
    db.commit()
    db.refresh(db_vivienda)
    return db_vivienda

def actualizar_vivienda(db: Session, vivienda_id: int, vivienda: schemas.ViviendaUpdate):
    db_vivienda = db.query(models.Vivienda).filter(models.Vivienda.id == vivienda_id).first()
    if db_vivienda:
        update_data = vivienda.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_vivienda, key, value)
        db.commit()
        db.refresh(db_vivienda)
    return db_vivienda