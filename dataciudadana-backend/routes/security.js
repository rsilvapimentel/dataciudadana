const express = require('express');
const router = express.Router();

// Cache para datos de seguridad
let cachedSecurityData = null;
let cacheTimestamp = null;
const CACHE_DURATION = 3600000; // 1 hora en ms

// Datos simulados de seguridad por región
const securityData = {
  statistics: {
    totalCrimes: 425650,
    homicides: 2145,
    robberies: 18320,
    assaults: 45230,
    thefts: 156890,
    drugRelated: 78500,
    sexualCrimes: 12450,
    criminalityRate: 2340, // por 100,000 habitantes
  },

  crimesByRegion: [
    { 
      region: 'Metropolitana de Santiago', 
      homicides: 680,
      robberies: 5200,
      assaults: 14520,
      thefts: 48900,
      crimeRate: 2800 // por 100,000 habitantes
    },
    { 
      region: 'Valparaíso', 
      homicides: 145,
      robberies: 1240,
      assaults: 3450,
      thefts: 8900,
      crimeRate: 2400
    },
    { 
      region: 'Biobío', 
      homicides: 198,
      robberies: 1680,
      assaults: 4200,
      thefts: 12340,
      crimeRate: 2650
    },
    { 
      region: 'Los Lagos', 
      homicides: 78,
      robberies: 680,
      assaults: 1920,
      thefts: 4560,
      crimeRate: 1980
    },
    { 
      region: 'La Araucanía', 
      homicides: 92,
      robberies: 520,
      assaults: 1680,
      thefts: 3240,
      crimeRate: 2150
    },
    { 
      region: 'Coquimbo', 
      homicides: 58,
      robberies: 420,
      assaults: 1240,
      thefts: 3120,
      crimeRate: 1850
    },
    { 
      region: 'Maule', 
      homicides: 87,
      robberies: 680,
      assaults: 1920,
      thefts: 4560,
      crimeRate: 2120
    },
    { 
      region: 'Antofagasta', 
      homicides: 45,
      robberies: 380,
      assaults: 890,
      thefts: 2340,
      crimeRate: 1920
    },
    { 
      region: 'Tarapacá', 
      homicides: 32,
      robberies: 240,
      assaults: 680,
      thefts: 1450,
      crimeRate: 1680
    },
    { 
      region: 'Atacama', 
      homicides: 28,
      robberies: 180,
      assaults: 520,
      thefts: 1200,
      crimeRate: 1450
    },
    { 
      region: 'Ñuble', 
      homicides: 48,
      robberies: 340,
      assaults: 920,
      thefts: 2100,
      crimeRate: 1780
    },
    { 
      region: 'Los Ríos', 
      homicides: 35,
      robberies: 260,
      assaults: 680,
      thefts: 1560,
      crimeRate: 1620
    },
    { 
      region: 'Aysén del Gral. Carlos Ibáñez del Campo', 
      homicides: 18,
      robberies: 120,
      assaults: 340,
      thefts: 680,
      crimeRate: 1280
    },
    { 
      region: 'Magallanes y la Antártica Chilena', 
      homicides: 22,
      robberies: 160,
      assaults: 420,
      thefts: 890,
      crimeRate: 1520
    },
    { 
      region: 'Arica y Parinacota', 
      homicides: 25,
      robberies: 200,
      assaults: 520,
      thefts: 1120,
      crimeRate: 1680
    },
  ],

  monthlyTrend: [
    { month: 'Enero', crimeRate: 2450, homicides: 185, robberies: 1580 },
    { month: 'Febrero', crimeRate: 2380, homicides: 178, robberies: 1520 },
    { month: 'Marzo', crimeRate: 2340, homicides: 175, robberies: 1480 },
    { month: 'Abril', crimeRate: 2290, homicides: 168, robberies: 1420 },
    { month: 'Mayo', crimeRate: 2250, homicides: 162, robberies: 1380 },
    { month: 'Junio', crimeRate: 2210, homicides: 158, robberies: 1340 },
  ],

  crimeTypes: [
    { type: 'Robo', count: 156890, percentage: 36.8, color: '#FF6B6B' },
    { type: 'Hurto', count: 89340, percentage: 21.0, color: '#FFA726' },
    { type: 'Asalto', count: 45230, percentage: 10.6, color: '#FFD93D' },
    { type: 'Tráfico de drogas', count: 78500, percentage: 18.4, color: '#6BCB77' },
    { type: 'Crímenes sexuales', count: 12450, percentage: 2.9, color: '#4D96FF' },
    { type: 'Homicidios', count: 2145, percentage: 0.5, color: '#8B0000' },
    { type: 'Otros', count: 41095, percentage: 9.8, color: '#999999' },
  ],

  safetyIndexByRegion: [
    { region: 'Aysén del Gral. Carlos Ibáñez del Campo', safetyIndex: 85 },
    { region: 'Los Ríos', safetyIndex: 82 },
    { region: 'Atacama', safetyIndex: 81 },
    { region: 'Tarapacá', safetyIndex: 80 },
    { region: 'Los Lagos', safetyIndex: 79 },
    { region: 'Arica y Parinacota', safetyIndex: 78 },
    { region: 'Coquimbo', safetyIndex: 77 },
    { region: 'Antofagasta', safetyIndex: 75 },
    { region: 'Ñuble', safetyIndex: 73 },
    { region: 'La Araucanía', safetyIndex: 70 },
    { region: 'Maule', safetyIndex: 68 },
    { region: 'Valparaíso', safetyIndex: 65 },
    { region: 'Biobío', safetyIndex: 62 },
    { region: 'Metropolitana de Santiago', safetyIndex: 58 },
    { region: 'Magallanes y la Antártica Chilena', safetyIndex: 60 },
  ],

  yearlyComparison: [
    { year: 2020, crimeRate: 2580, homicides: 2340, trend: 'up' },
    { year: 2021, crimeRate: 2620, homicides: 2410, trend: 'up' },
    { year: 2022, crimeRate: 2490, homicides: 2280, trend: 'down' },
    { year: 2023, crimeRate: 2380, homicides: 2180, trend: 'down' },
    { year: 2024, crimeRate: 2340, homicides: 2145, trend: 'down' },
  ],
};

// Endpoint: Obtener estadísticas generales de seguridad
router.get('/statistics', (req, res) => {
  res.json(securityData.statistics);
});

// Endpoint: Obtener crímenes por región
router.get('/by-region', (req, res) => {
  res.json(securityData.crimesByRegion);
});

// Endpoint: Obtener una región específica
router.get('/by-region/:region', (req, res) => {
  const region = req.params.region;
  const data = securityData.crimesByRegion.find(
    r => r.region.toLowerCase() === region.toLowerCase()
  );
  
  if (!data) {
    return res.status(404).json({ error: 'Región no encontrada' });
  }
  
  res.json(data);
});

// Endpoint: Obtener tendencia mensual
router.get('/monthly-trend', (req, res) => {
  res.json(securityData.monthlyTrend);
});

// Endpoint: Obtener tipos de crímenes
router.get('/crime-types', (req, res) => {
  res.json(securityData.crimeTypes);
});

// Endpoint: Obtener índice de seguridad por región
router.get('/safety-index', (req, res) => {
  res.json(securityData.safetyIndexByRegion);
});

// Endpoint: Obtener comparación anual
router.get('/yearly-comparison', (req, res) => {
  res.json(securityData.yearlyComparison);
});

// Endpoint: Obtener datos combinados (para dashboard rápido)
router.get('/dashboard', (req, res) => {
  res.json({
    statistics: securityData.statistics,
    topCrimes: securityData.crimeTypes.slice(0, 5),
    crimesByRegion: securityData.crimesByRegion.slice(0, 5),
    monthlyTrend: securityData.monthlyTrend,
    safetyIndex: securityData.safetyIndexByRegion.slice(0, 8),
  });
});

module.exports = router;
