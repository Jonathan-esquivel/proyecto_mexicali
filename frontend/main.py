import streamlit as st
import folium
from streamlit_folium import st_folium
import sys
import os

# Ajuste de ruta para importar el backend
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from backend.database import SessionLocal, engine, Base
from backend import crud, models

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

# Configuración de página minimalista
st.set_page_config(page_title="Mexicali - Capa Vivienda Vandalizada", layout="wide")

# MODO OSCURO (Inyección de CSS)
st.markdown("""
    <style>
    .stApp { background-color: #0e1117; color: #ffffff; }
    header, footer {visibility: hidden;}
    </style>
    """, unsafe_allow_html=True)

st.title("📍 Viviendas Vandalizadas - Mexicali")
st.write("Capa 1: Visualización de puntos críticos")

# Lógica del Backend
db = SessionLocal()
viviendas = crud.obtener_viviendas(db)

# Si no hay datos, cargar los 10 de ejemplo
if not viviendas:
    # Aquí podrías llamar a una función de semilla
    st.info("No hay datos en la base de datos. Por favor, cargue la semilla.")
else:
    # Crear Mapa
    m = folium.Map(location=[32.627, -115.454], zoom_start=12, tiles="OpenStreetMap")
    
    for v in viviendas:
        folium.CircleMarker(
            location=[v.latitud, v.longitud],
            radius=6,
            popup=f"{v.direccion} - {v.estado}",
            color="#ff4b4b",
            fill=True,
            fill_color="#ff4b4b"
        ).add_to(m)

    # Mostrar Mapa
    st_folium(m, width=1200, height=600)

db.close()