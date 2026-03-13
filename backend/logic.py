import streamlit as st
import pandas as pd
from database import SessionLocal
import crud

@st.cache_data
def get_map_data():
    """Conecta con el backend y prepara los datos para el mapa."""
    db = SessionLocal()
    viviendas = crud.obtener_viviendas(db)
    db.close()
    
    # Convertimos a DataFrame para que Folium lo lea fácil
    return pd.DataFrame([
        {
            "lat": v.latitud,
            "lon": v.longitud,
            "direccion": v.direccion,
            "estado": v.estado
        } for v in viviendas
    ])

def seed_database():
    """Datos de las 10 casas de Mexicali (Ejemplo)"""
    db = SessionLocal()
    datos_mexicali = [
        {"direccion": "Calle A, Col. Centro", "latitud": 32.627, "longitud": -115.454},
        {"direccion": "Av. Reforma, Mexicali", "latitud": 32.662, "longitud": -115.485},
        # ... agregar las otras 8 casas aquí
    ]
    crud.insertar_vivienda_semilla(db, datos_mexicali)
    db.close()