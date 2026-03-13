import sys
import os

# Asegurar que Python encuentre el módulo backend
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.database import SessionLocal, engine, Base
from backend.models import Vivienda

# 1. Crear las tablas si no existen
Base.metadata.create_all(bind=engine)

def cargar_datos_mexicali():
    db = SessionLocal()
    
    # Datos de ejemplo basados en la zona de Mexicali (Capa 1)
    casas_iniciales = [
        {"direccion": "Av. Reforma y Calle B, Centro", "latitud": 32.6642, "longitud": -115.4842},
        {"direccion": "Colonia Nueva, Calle I", "latitud": 32.6590, "longitud": -115.4670},
        {"direccion": "Fracc. Los Pinos, Av. de los Pinos", "latitud": 32.6450, "longitud": -115.4420},
        {"direccion": "Col. Industrial, Calle F", "latitud": 32.6520, "longitud": -115.4780},
        {"direccion": "Blvd. Anáhuac, Prohogar", "latitud": 32.6350, "longitud": -115.4600},
        {"direccion": "Av. Madero, Segunda Sección", "latitud": 32.6660, "longitud": -115.4890},
        {"direccion": "Fracc. Montecarlo", "latitud": 32.6200, "longitud": -115.3900},
        {"direccion": "Col. Carbajal, Av. 16 de Septiembre", "latitud": 32.6150, "longitud": -115.4500},
        {"direccion": "González Ortega (Palaco)", "latitud": 32.6050, "longitud": -115.3700},
        {"direccion": "Valle de Puebla, Calle Casa Blanca", "latitud": 32.5800, "longitud": -115.3200},
    ]

    try:
        # Verificar si ya hay datos para no duplicar
        conteo = db.query(Vivienda).count()
        if conteo == 0:
            print(f"Insertando {len(casas_iniciales)} viviendas...")
            for data in casas_iniciales:
                nueva_casa = Vivienda(**data)
                db.add(nueva_casa)
            db.commit()
            print("¡Carga exitosa!")
        else:
            print(f"La base de datos ya tiene {conteo} registros. No se insertó nada.")
    except Exception as e:
        print(f"Error al cargar datos: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    cargar_datos_mexicali()