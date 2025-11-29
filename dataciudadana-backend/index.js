const express = require('express');
const cors = require('cors');
const employmentRouter = require('./routes/employment');
const securityRouter = require('./routes/security');
const economicRouter = require('./routes/economic');

const app = express();
app.use(cors());
app.use(express.json());

const categories = [
  { id: 1, name: 'Salud', icon: 'heart' },
  { id: 2, name: 'Educación', icon: 'school' },
  { id: 3, name: 'Medio Ambiente', icon: 'leaf' },
  { id: 4, name: 'Economía', icon: 'chart' },
  { id: 5, name: 'Transporte', icon: 'bus' },
];

const datasets = [
  {
    id: 1,
    title: 'Presupuesto Nacional 2025',
    ministry: 'Ministerio de Hacienda',
    updatedAgo: 'Hace 2 horas',
    downloads: 1234,
  },
  {
    id: 2,
    title: 'Indicadores de Salud Pública',
    ministry: 'Ministerio de Salud',
    updatedAgo: 'Hace 5 horas',
    downloads: 892,
  },
];

const stats = {
  datasets: 2847,
  activeUsers: 45231,
  ministries: 24,
  updatesToday: 127,
};

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/datasets', (req, res) => {
  const search = (req.query.search || '').toLowerCase();
  const filtered = datasets.filter(d =>
    d.title.toLowerCase().includes(search) ||
    d.ministry.toLowerCase().includes(search)
  );
  res.json(filtered);
});

app.get('/api/stats', (req, res) => {
  res.json(stats);
});

// Rutas de empleo
app.use('/api/employment', employmentRouter);

// Rutas de seguridad
app.use('/api/security', securityRouter);

// Rutas de economía
app.use('/api/economic', economicRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
