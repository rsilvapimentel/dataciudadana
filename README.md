# DataCiudadana

**Transparencia en tus manos: explora los datos públicos de Chile**

DataCiudadana es una plataforma web que facilita el acceso a información pública verificada de Chile. Permite a los ciudadanos comprender indicadores clave y participar activamente en la gestión democrática del país.

## Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Dashboards](#-dashboards)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## Características

- **Portal Principal**: Exploración de datasets por categorías (Salud, Educación, Medio Ambiente, Economía, Transporte)
- **Dashboard de Empleo**: Visualización de indicadores de empleo, desempleo y salarios por sector
- **Dashboard de Seguridad**: Estadísticas de delitos, efectividad policial y tendencias de seguridad
- **Visualizaciones Interactivas**: Gráficos y tablas con datos actualizados
- **Búsqueda Avanzada**: Filtrado de datasets por título y ministerio
- **Estadísticas en Tiempo Real**: Datasets disponibles, usuarios activos, ministerios participantes

## Tecnologías

### Frontend
- **React 19** - Biblioteca de interfaz de usuario
- **Material-UI (MUI) 5** - Framework de componentes de diseño
- **Recharts 3** - Biblioteca de gráficos
- **Vite** - Herramienta de construcción
- **Emotion** - CSS-in-JS

### Backend
- **Node.js** - Entorno de ejecución
- **Express 4** - Framework web
- **CORS** - Middleware de seguridad
- **node-fetch** - Cliente HTTP para APIs externas

## Estructura del Proyecto

```
dataciudadana/
├── dataciudadana-backend/      # API Backend
│   ├── routes/                 # Rutas de la API
│   │   ├── employment.js       # Endpoints de empleo
│   │   ├── security.js         # Endpoints de seguridad
│   │   └── economic.js         # Endpoints económicos
│   ├── index.js                # Servidor principal
│   └── package.json
│
├── dataciudadana-frontend/     # Aplicación Frontend
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── EmploymentDashboard.jsx
│   │   │   └── SecurityDashboard.jsx
│   │   ├── App.jsx             # Componente principal
│   │   ├── main.jsx            # Punto de entrada
│   │   └── index.css
│   └── package.json
│
├── .gitignore
└── README.md
```

## Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd dataciudadana
```

### 2. Instalar dependencias del Backend

```bash
cd dataciudadana-backend
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../dataciudadana-frontend
npm install
```

## Uso

### Ejecutar Backend (Servidor API)

Desde el directorio `dataciudadana-backend`:

```bash
# Modo producción
npm start

# Modo desarrollo (con auto-reload)
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Ejecutar Frontend

Desde el directorio `dataciudadana-frontend`:

```bash
# Modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

La aplicación estará disponible en `http://localhost:5173` (por defecto)

## API Endpoints

### Endpoints Generales

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/categories` | Obtiene todas las categorías |
| GET | `/api/datasets` | Lista los datasets (acepta parámetro `?search=`) |
| GET | `/api/stats` | Estadísticas generales de la plataforma |

### Endpoints de Empleo

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/employment/overview` | Resumen de indicadores de empleo |
| GET | `/api/employment/unemployment` | Tendencias de desempleo |
| GET | `/api/employment/salary` | Datos de salarios por sector |

### Endpoints de Seguridad

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/security/overview` | Resumen de seguridad ciudadana |
| GET | `/api/security/crimes` | Estadísticas de delitos |
| GET | `/api/security/trends` | Tendencias de seguridad |

### Endpoints Económicos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/economic/overview` | Indicadores económicos generales |

## Dashboards

### Dashboard de Empleo
- Tasa de desempleo nacional
- Tendencias de empleo formal/informal
- Salarios promedio por sector
- Gráficos de evolución temporal

### Dashboard de Seguridad
- Tasa de delitos por cada 100,000 habitantes
- Efectividad policial
- Tipos de delitos más comunes
- Tendencias mensuales

**DataCiudadana** - *Haciendo los datos públicos más accesibles para todos los chilenos* 🇨🇱
