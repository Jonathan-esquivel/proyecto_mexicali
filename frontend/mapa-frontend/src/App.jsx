import './App.css'
import MapView from './MapView'
import { useState, useEffect } from 'react'

import { useTheme } from './useTheme'
import AccessibilityButton from './AccessibilityButton'

import viviendasData from './viviendas.json'

function App() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mapCenter, setMapCenter] = useState([32.62391, -115.45279]) // initial Mexicali coords
  const [showPanel, setShowPanel] = useState(false)
  const [selectedVivienda, setSelectedVivienda] = useState(null)
  const [viviendas, setViviendas] = useState([])
  // Nuevo estado para controlar si estamos reportando una vivienda nueva
  const [isReporting, setIsReporting] = useState(false)

const [formData, setFormData] = useState({
    direccion: '',
    estado: 'Vandalizada',
    latitud: 0,
    longitud: 0
  })

  const cargarViviendas = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/viviendas')
      const data = await response.json()
      setViviendas(data)
    } catch (error) {
      console.error("Error al cargar viviendas:", error)
    }
  }

  useEffect(() => {
    cargarViviendas()
  }, [])

  const handleLocationSelect = (lat, lon, viviendaExistente = null) => {
    setMapCenter([lat, lon])
    setSelectedVivienda(null)
    setFormData(prev => ({
      ...prev,
      latitud: lat,
      longitud: lon
    }))
    setIsReporting(true) // Al seleccionar ubicación nueva, activamos modo reporte
    setShowPanel(true)
  }

  const handleMarkerClick = (vivienda) => {
    setMapCenter([vivienda.latitud, vivienda.longitud])
    setSelectedVivienda(vivienda)
    setIsReporting(false) // Al hacer click en marcador existente, es modo vista
    setShowPanel(true)
  }

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`)
        const data = await response.json()
        if (data && data.length > 0) {
          const { lat, lon } = data[0]
          handleLocationSelect(parseFloat(lat), parseFloat(lon))
        } else {
          alert("Dirección no encontrada")
        }
      } catch (error) {
        console.error("Error al buscar la dirección:", error)
      }
    }
  }

  const handleSave = async () => {
    if (!formData.direccion) {
      alert("Por favor escribe una dirección");
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/viviendas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert("Vivienda guardada correctamente")
        cargarViviendas() 
        setShowPanel(false)
      } else {
        alert("Error al guardar la vivienda")
      }
    } catch (error) {
      console.error("Error en la petición:", error)
    }
  }

  useEffect(() => {
    fetch('http://127.0.0.1:8000/viviendas')
      .then(response => response.json())
      .then(data => setViviendas(data))
      .catch(error => console.error("Error al cargar viviendas:", error));
  }, []);

  return (
    <div className="app-container">
      <header className="top-header">
        <div className="logo-section">
          <h2>LOGO</h2>
        </div>
        <div className="nav-section">
          <button className="nav-button" onClick={() => { setShowPanel(false); setIsReporting(false); }}>Inicio</button>
          {/* Botón para abrir el slide de registro manualmente */}
          <button className="nav-button" style={{ marginLeft: '10px', backgroundColor: '#3498db', color: 'white' }} onClick={() => { setIsReporting(true); setSelectedVivienda(null); setShowPanel(true); }}>Reportar Vivienda</button>
        </div>
        <div className="settings-section">
          <svg onClick={() => setIsSettingsOpen(true)} viewBox="0 0 24 24" width="34" height="34" fill="currentColor" className="gear-icon">
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
          </svg>
        </div>
      </header>

      <main className="main-content">
        <div className={`map-area ${showPanel ? 'shrink' : ''}`}>
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Buscar dirección y presiona Enter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          <div className="map-wrapper">
            <MapView
              center={mapCenter}
              onMapClick={handleLocationSelect}
              viviendas={viviendas}
              onMarkerClick={handleMarkerClick}
            />
          </div>
        </div>

        <div className={`side-panel ${showPanel ? 'open' : ''}`}>
          <button className="close-panel-btn" onClick={() => setShowPanel(false)}>✕</button>
          <div className="panel-content">
            <div className="image-placeholder">
              <span>{isReporting ? 'Subir Foto Vivienda' : 'Imagen (Template)'}</span>
            </div>
            
            {/* Lógica condicional: Si isReporting es true, muestra campos vacíos para llenar */}
            {isReporting ? (
              <>
                <div className="info-group">
                  <strong>DIRECCIÓN</strong>
                  <input type="text" className="form-input" placeholder="Ingrese dirección..." value={formData.direccion} onChange={(e) => setFormData({...formData, direccion: e.target.value})} />
                </div>
                <div className="info-group">
                  <strong>Status de Vivienda</strong>
                  <select className="form-input" value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value})}>
                    <option value="Abandonada">Abandonada</option>
                    <option value="Vandalizada">Vandalizada</option>
                    <option value="Deshabitada">Deshabitada</option>
                  </select>
                </div>
                <div className="info-group">
                  <strong>Fecha de Registro</strong>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
                <div className="info-group">
                  <strong>ID</strong>
                  <p>Auto-generado</p>
                </div>
                <button className="save-button" onClick={handleSave}>Guardar Registro</button>
              </>
            ) : selectedVivienda ? (
              <>
                <div className="info-group">
                  <strong>DIRECCIÓN</strong>
                  <p>{selectedVivienda.direccion}</p>
                </div>
                <div className="info-group">
                  <strong>Status de Vivienda</strong>
                  <p>{selectedVivienda.estado}</p>
                </div>
                <div className="info-group">
                  <strong>Fecha de Registro</strong>
                  <p>{new Date(selectedVivienda.fecha_registro).toLocaleString()}</p>
                </div>
                <div className="info-group">
                  <strong>ID</strong>
                  <p>{selectedVivienda.id}</p>
                </div>
              </>
            ) : (
              <>
                <div className="info-group">
                  <strong>NOMBRE UBICACION</strong>
                  <p>Descripcion</p>
                </div>
                <div className="info-group">
                  <strong>Telefono</strong>
                  <p>Descripcion</p>
                </div>
                <div className="info-group">
                  <strong>Direccion</strong>
                  <p>Descripcion</p>
                </div>
                <div className="info-group">
                  <strong>Status de Vivienda</strong>
                  <p>Descripcion</p>
                </div>
              </>
            )}

            <div className="info-group">
              <strong>Coordenada Longitud</strong>
              <p>{mapCenter[1].toFixed(5)}</p>
            </div>
            <div className="info-group">
              <strong>Coordenada Latitud</strong>
              <p>{mapCenter[0].toFixed(5)}</p>
            </div>
            <div className="info-group">
              <strong>Observaciones</strong>
              <textarea className="observations-box" placeholder="Añada comentarios sobre el estado..."></textarea>
            </div>

            <button onClick={handleSave} style={{marginTop: '10px'}}>
              Guardar en Base de Datos
            </button>
          </div>
        </div>
      </main>

      {isSettingsOpen && (
        <div className="modal-overlay" onClick={() => setIsSettingsOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Configuración</h2>
            <p>Opciones de configuración del mapa...</p>
            <button className="close-modal-btn" onClick={() => setIsSettingsOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}
      <AccessibilityButton isDarkMode={isDarkMode} onToggle={toggleTheme} />
    </div>
  )
}

export default App
