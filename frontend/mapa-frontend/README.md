# Aplicación de Mapa de Bienes Raíces (Frontend)

Este proyecto es una aplicación frontend basada en React diseñada para mostrar información en un mapa sobre propiedades de bienes raíces. Fue inicializada con Vite y está configurada para un desarrollo rápido y construcciones optimizadas para producción.

## Características

- **Vista de Mapa Interactiva**: Muestra un mapa interactivo renderizado mediante [Leaflet](https://leafletjs.com/) y [React-Leaflet](https://react-leaflet.js.org/).
- **Mapas de OpenStreetMap**: Integra mapas libres y abiertos de OpenStreetMap.
- **Desarrollo Rápido**: Utiliza Vite para un Hot Module Replacement (HMR) ultra rápido y construcciones optimizadas.

## Estructura del Proyecto

- `src/App.jsx`: Punto de entrada principal que renderiza el contenedor general de la aplicación.
- `src/MapView.jsx`: El componente principal del mapa interactivo. Por defecto, centra la vista geográficamente (ej. en las coordenadas de Tijuana) y configura las capas del mapa.

## Guía de Inicio

### Requisitos Previos

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu computadora.

### Instalación

1. Navega al directorio del frontend:
   ```bash
   cd mapa-frontend
   ```
2. Instala las dependencias necesarias (incluyendo `react-leaflet` y `leaflet`):
   ```bash
   npm install
   ```

### Ejecutar el Servidor de Desarrollo

Para iniciar el servidor de desarrollo local:

```bash
npm run dev
```

La terminal mostrará una dirección local (por ejemplo, `http://localhost:5173`). Abre esta URL en tu navegador para ver el mapa interactivo.

## Tecnologías Utilizadas

- **React** para los componentes de la interfaz de usuario
- **Vite** como herramienta de construcción y servidor de desarrollo
- **Leaflet & React-Leaflet** para renderizar la capa del mapa interactivo
