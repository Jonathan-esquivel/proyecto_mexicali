import sqlite3
import json
import os

# Obtiene el directorio base donde se encuentra este script (carpeta "frontend")
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construye las rutas relativas basadas en la ubicación del script
db_path = os.path.join(script_dir, "..", "mexicali_viviendas.db")
out_path = os.path.join(script_dir, "mapa-frontend", "src", "viviendas.json")

conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

cursor.execute("SELECT * FROM viviendas")
rows = cursor.fetchall()

data = [dict(row) for row in rows]

with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Exportados {len(data)} registros a {out_path}")
conn.close()
