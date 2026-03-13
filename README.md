# 📍 GIS Viviendas Vandalizadas - Mexicali (Capa 1)

Sistema de Información Geográfica minimalista diseñado para la visualización de viviendas abandonadas/vandalizadas en Mexicali, B.C. Este proyecto utiliza un stack moderno de Python para el procesamiento de datos geoespaciales y una interfaz de usuario limpia con soporte para modo oscuro.

## 🛠️ Stack Tecnológico

* **Backend:** Python 3.11+, SQLAlchemy (ORM).
* **Base de Datos:** PostgreSQL (Soportado) / SQLite (Local).
* **Frontend:** Streamlit + Folium para mapeo interactivo.
* **Validación:** Pydantic para esquemas de datos.

## 📁 Estructura del Proyecto

```text
proyecto_mexicali/
├── backend/            # Lógica de negocio, modelos y base de datos
│   ├── database.py     # Configuración de conexión
│   ├── models.py       # Modelos de SQLAlchemy
│   ├── schemas.py      # Validación con Pydantic
│   ├── crud.py         # Operaciones de base de datos
│   └── data_seed.py    # Script de carga inicial de datos
├── frontend/           # Capa de visualización
│   └── main.py         # Interfaz en Streamlit
├── .env                # Variables de entorno (no subir a Git)
└── requirements.txt    # Dependencias del sistema