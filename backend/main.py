from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from .database import get_db
from . import crud, models, database, schemas

app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/viviendas")
def leer_viviendas(db: Session = Depends(get_db)):
    return crud.obtener_viviendas(db)

@app.post("/viviendas")
def crear_vivienda(vivienda: schemas.ViviendaCreate, db: Session = Depends(get_db)):
    return crud.crear_vivienda(db=db, vivienda=vivienda)

@app.put("/viviendas/{vivienda_id}")
def actualizar_vivienda(vivienda_id: int, vivienda: schemas.ViviendaUpdate, db: Session = Depends(get_db)):
    return crud.actualizar_vivienda(db=db, vivienda_id=vivienda_id, vivienda=vivienda)