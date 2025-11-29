import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const API_URL = 'http://localhost:3000/api/security';

function SecurityDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  
  const [statistics, setStatistics] = useState(null);
  const [crimesByRegion, setCrimesByRegion] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [safetyIndex, setSafetyIndex] = useState([]);
  const [yearlyComparison, setYearlyComparison] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [statsRes, regionsRes, trendRes, typesRes, safetyRes, yearlyRes] = await Promise.all([
        fetch(`${API_URL}/statistics`),
        fetch(`${API_URL}/by-region`),
        fetch(`${API_URL}/monthly-trend`),
        fetch(`${API_URL}/crime-types`),
        fetch(`${API_URL}/safety-index`),
        fetch(`${API_URL}/yearly-comparison`),
      ]);

      const [stats, regions, trend, types, safety, yearly] = await Promise.all([
        statsRes.json(),
        regionsRes.json(),
        trendRes.json(),
        typesRes.json(),
        safetyRes.json(),
        yearlyRes.json(),
      ]);

      setStatistics(stats);
      setCrimesByRegion(regions);
      setMonthlyTrend(trend);
      setCrimeTypes(types);
      setSafetyIndex(safety);
      setYearlyComparison(yearly);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1, fontWeight: 'bold', color: '#000000' }}>
          Dashboard de Seguridad y Delincuencia
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Indicadores de criminalidad, tasa de delitos y análisis por región
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Estadísticas Generales */}
      {statistics && (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#FFEBEE' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Total de Crímenes</Typography>
                <Typography variant="h5">{statistics.totalCrimes.toLocaleString()}</Typography>
                <Typography variant="caption" sx={{ color: '#C62828' }}>En lo que va del año</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#FCE4EC' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Homicidios</Typography>
                <Typography variant="h5">{statistics.homicides.toLocaleString()}</Typography>
                <Typography variant="caption">{(statistics.homicides / statistics.totalCrimes * 100).toFixed(1)}% del total</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#FFF3E0' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Robos</Typography>
                <Typography variant="h5">{statistics.robberies.toLocaleString()}</Typography>
                <Typography variant="caption">{(statistics.robberies / statistics.totalCrimes * 100).toFixed(1)}% del total</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#E0F2F1' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Tasa de Criminalidad</Typography>
                <Typography variant="h5">{statistics.criminalityRate}</Typography>
                <Typography variant="caption">Por 100,000 habitantes</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Análisis General" />
        <Tab label="Por Región" />
        <Tab label="Tipos de Crímenes" />
        <Tab label="Tendencias" />
      </Tabs>

      {/* TAB 0: Análisis General */}
      {tabValue === 0 && (
        <Box sx={{ mb: 4 }}>
          {safetyIndex && safetyIndex.length > 0 && yearlyComparison && yearlyComparison.length > 0 ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Índice de Seguridad por Región</Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[...safetyIndex].sort((a, b) => b.safetyIndex - a.safetyIndex)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" angle={-45} textAnchor="end" height={80} interval={0} tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="safetyIndex" fill="#4CAF50" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Comparación Anual</Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={yearlyComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="crimeRate" stroke="#FF5722" name="Tasa de Criminalidad" strokeWidth={2} />
                      <Line type="monotone" dataKey="homicides" stroke="#C62828" name="Homicidios" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Alert severity="info">Cargando datos de análisis general...</Alert>
          )}
        </Box>
      )}

      {/* TAB 1: Por Región */}
      {tabValue === 1 && (
        <Box sx={{ mb: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Crímenes por Región</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                    <TableCell><strong>Región</strong></TableCell>
                    <TableCell align="right"><strong>Homicidios</strong></TableCell>
                    <TableCell align="right"><strong>Robos</strong></TableCell>
                    <TableCell align="right"><strong>Asaltos</strong></TableCell>
                    <TableCell align="right"><strong>Hurtos</strong></TableCell>
                    <TableCell align="right"><strong>Tasa (x100k hab.)</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {crimesByRegion.map((region, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{region.region}</TableCell>
                      <TableCell align="right">{region.homicides}</TableCell>
                      <TableCell align="right">{region.robberies}</TableCell>
                      <TableCell align="right">{region.assaults}</TableCell>
                      <TableCell align="right">{region.thefts}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: region.crimeRate > 2400 ? '#D32F2F' : '#388E3C' }}>
                        {region.crimeRate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}

      {/* TAB 2: Tipos de Crímenes */}
      {tabValue === 2 && (
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Distribución de Crímenes</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={crimeTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {crimeTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => value.toLocaleString()} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Estadísticas por Tipo</Typography>
                <TableContainer sx={{ maxHeight: 300 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                        <TableCell><strong>Tipo de Crimen</strong></TableCell>
                        <TableCell align="right"><strong>Cantidad</strong></TableCell>
                        <TableCell align="right"><strong>%</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {crimeTypes.map((crime, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box sx={{ width: 12, height: 12, bgcolor: crime.color, borderRadius: '50%' }} />
                              {crime.type}
                            </Box>
                          </TableCell>
                          <TableCell align="right">{crime.count.toLocaleString()}</TableCell>
                          <TableCell align="right">{crime.percentage.toFixed(1)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* TAB 3: Tendencias */}
      {tabValue === 3 && (
        <Box sx={{ mb: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Tendencia Mensual de Crímenes</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="crimeRate" stroke="#FF5722" name="Tasa de Criminalidad" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="homicides" stroke="#C62828" name="Homicidios" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="robberies" stroke="#FFA726" name="Robos" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}>Detalles Mensuales</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                    <TableCell><strong>Mes</strong></TableCell>
                    <TableCell align="right"><strong>Tasa Criminalidad</strong></TableCell>
                    <TableCell align="right"><strong>Homicidios</strong></TableCell>
                    <TableCell align="right"><strong>Robos</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {monthlyTrend.map((month, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{month.month}</TableCell>
                      <TableCell align="right">{month.crimeRate}</TableCell>
                      <TableCell align="right">{month.homicides}</TableCell>
                      <TableCell align="right">{month.robberies}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}
    </Container>
  );
}

export default SecurityDashboard;
