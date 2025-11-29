const express = require('express');
const router = express.Router();

// Cache para datos de economia
let cachedEconomicData = null;
let cacheTimestamp = null;
const CACHE_DURATION = 86400000; // 24 horas en ms

// Función para obtener datos del Banco Central de Chile
async function fetchBancoCentralData() {
  try {
    console.log('Fetching data from Banco Central API...');
    
    // API del Banco Central de Chile - Indicadores económicos
    const response = await fetch('https://api.bcentral.cl/api/Series/DOLLOM/data?limit=30&format=JSON', {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Banco Central:', error.message);
    return null;
  }
}

// Función para obtener datos de desempleo del INE (simulados pero con estructura real)
async function fetchUnemploymentData() {
  try {
    // En un escenario real, aquí iría una llamada a la API del INE
    // Por ahora retornamos datos estructurados realistas
    return {
      current: 3.1, // Tasa de desempleo actual (actualizar manualmente)
      trend: [
        { month: 'Julio 2024', rate: 3.2 },
        { month: 'Agosto 2024', rate: 3.3 },
        { month: 'Septiembre 2024', rate: 3.2 },
        { month: 'Octubre 2024', rate: 3.1 },
        { month: 'Noviembre 2024', rate: 3.1 }
      ],
      byRegion: [
        { region: 'Metropolitana de Santiago', rate: 3.4 },
        { region: 'Valparaíso', rate: 3.0 },
        { region: 'Biobío', rate: 3.5 },
        { region: 'Los Lagos', rate: 2.8 },
        { region: 'La Araucanía', rate: 3.2 }
      ]
    };
  } catch (error) {
    console.error('Error fetching unemployment data:', error);
    return null;
  }
}

// Endpoint: Obtener indicadores económicos reales
router.get('/economic-indicators', async (req, res) => {
  try {
    let data;
    
    // Verificar si hay datos en cache y si aún son válidos
    if (cachedEconomicData && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
      data = cachedEconomicData;
    } else {
      data = await fetchBancoCentralData();
      if (data) {
        cachedEconomicData = data;
        cacheTimestamp = Date.now();
      }
    }
    
    if (!data) {
      return res.status(503).json({ 
        error: 'No es posible obtener datos en este momento',
        message: 'Los servicios del Banco Central podrían no estar disponibles'
      });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error in economic-indicators endpoint:', error);
    res.status(500).json({ error: 'Error al obtener indicadores económicos' });
  }
});

// Endpoint: Obtener datos de desempleo
router.get('/unemployment', async (req, res) => {
  try {
    const data = await fetchUnemploymentData();
    
    if (!data) {
      return res.status(500).json({ error: 'Error al obtener datos de desempleo' });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error in unemployment endpoint:', error);
    res.status(500).json({ error: 'Error al obtener datos de desempleo' });
  }
});

// Endpoint: Obtener IPC (Índice de Precios al Consumidor)
router.get('/ipc', async (req, res) => {
  try {
    // En un caso real, esto vendría del Banco Central
    // Por ahora retornamos datos realistas estructurados
    const ipcData = {
      currentIPC: 2.1, // IPC actual en porcentaje
      previousMonth: 1.9,
      yearOverYear: 2.8,
      lastYear: [
        { month: 'Diciembre 2023', ipc: 2.4 },
        { month: 'Enero 2024', ipc: 2.5 },
        { month: 'Febrero 2024', ipc: 2.2 },
        { month: 'Marzo 2024', ipc: 2.1 },
        { month: 'Abril 2024', ipc: 2.3 },
        { month: 'Mayo 2024', ipc: 2.0 },
        { month: 'Junio 2024', ipc: 2.2 },
        { month: 'Julio 2024', ipc: 2.4 },
        { month: 'Agosto 2024', ipc: 2.3 },
        { month: 'Septiembre 2024', ipc: 2.1 },
        { month: 'Octubre 2024', ipc: 1.9 },
        { month: 'Noviembre 2024', ipc: 2.1 }
      ]
    };
    
    res.json(ipcData);
  } catch (error) {
    console.error('Error in IPC endpoint:', error);
    res.status(500).json({ error: 'Error al obtener IPC' });
  }
});

// Endpoint: Obtener datos económicos consolidados
router.get('/dashboard-real', async (req, res) => {
  try {
    const [unemploymentData, ipcData] = await Promise.all([
      fetchUnemploymentData(),
      new Promise((resolve) => {
        // Simular IPC
        resolve({
          currentIPC: 2.1,
          previousMonth: 1.9
        });
      })
    ]);
    
    res.json({
      unemployment: unemploymentData,
      ipc: ipcData,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in dashboard-real endpoint:', error);
    res.status(500).json({ error: 'Error al obtener datos económicos' });
  }
});

module.exports = router;
