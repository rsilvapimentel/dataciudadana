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

const API_URL = 'http://localhost:3000/api/employment';

function EmploymentDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  
  const [statistics, setStatistics] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [regions, setRegions] = useState([]);
  const [govRegions, setGovRegions] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [realData, setRealData] = useState(null);
  
  const [queryType, setQueryType] = useState('sector');
  const [queryValue, setQueryValue] = useState('');
  const [queryResults, setQueryResults] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [statsRes, sectorsRes, regionsRes, trendRes, educationRes, ageRes, govRegionsRes, realDataRes] = await Promise.all([
        fetch(`${API_URL}/statistics`),
        fetch(`${API_URL}/sectors`),
        fetch(`${API_URL}/by-region`),
        fetch(`${API_URL}/monthly-trend`),
        fetch(`${API_URL}/education-level`),
        fetch(`${API_URL}/age-groups`),
        fetch(`${API_URL}/regions-gob`),
        fetch(`${API_URL}/real-data`),
      ]);

      const [stats, sec, reg, trend, edu, age, govReg, real] = await Promise.all([
        statsRes.json(),
        sectorsRes.json(),
        regionsRes.json(),
        trendRes.json(),
        educationRes.json(),
        ageRes.json(),
        govRegionsRes.json(),
        realDataRes.json(),
      ]);

      setStatistics(stats);
      setSectors(sec);
      setRegions(reg);
      setGovRegions(govReg);
      setMonthlyTrend(trend);
      setEducationData(edu);
      setAgeData(age);
      setRealData(real);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = async (e) => {
    e.preventDefault();
    if (!queryValue.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: queryType,
          [queryType === 'sector' ? 'sector' : 'region']: queryValue,
        }),
      });

      const data = await response.json();
      setQueryResults(data);
    } catch (err) {
      setError(err.message);
      setQueryResults(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Dashboard de Empleo
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
        >
          <Tab label="Consultas" />
          <Tab label="Datos Reales INE" />
        </Tabs>
      </Box>

      {/* TAB 0: ESTADÍSTICAS GENERALES */}
      {/* TAB 0: CONSULTAS PERSONALIZADAS */}
      {tabValue === 0 && (
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Realizar Consulta Personalizada</Typography>
            <Box component="form" onSubmit={handleQuery} sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <TextField
                select
                value={queryType}
                onChange={(e) => {
                  setQueryType(e.target.value);
                  setQueryValue(''); // Limpiar valor cuando cambia tipo
                }}
                label="Tipo de Búsqueda"
                sx={{ minWidth: 200 }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="sector">Buscar por Sector</option>
                <option value="region">Buscar por Región</option>
              </TextField>

              {queryType === 'sector' ? (
                <TextField
                  select
                  value={queryValue}
                  onChange={(e) => setQueryValue(e.target.value)}
                  label="Seleccionar Sector"
                  sx={{ flex: 1, minWidth: 200 }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value=""></option>
                  {sectors.map((sector) => (
                    <option key={sector.id} value={sector.name}>
                      {sector.name}
                    </option>
                  ))}
                </TextField>
              ) : (
                <TextField
                  select
                  value={queryValue}
                  onChange={(e) => setQueryValue(e.target.value)}
                  label="Seleccionar Región"
                  sx={{ flex: 1, minWidth: 200 }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value=""></option>
                  {govRegions && govRegions.length > 0 ? (
                    govRegions.map((region) => (
                      <option key={region.codigo} value={region.nombre}>
                        {region.nombre}
                      </option>
                    ))
                  ) : (
                    <option disabled>Cargando regiones...</option>
                  )}
                </TextField>
              )}

              <Button variant="contained" type="submit" disabled={loading || !queryValue.trim()}>
                {loading ? 'Buscando...' : 'Consultar'}
              </Button>
            </Box>

            {queryResults && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* VISUALIZACIÓN AMIGABLE */}
                <Paper sx={{ p: 3, bgcolor: '#E8F5E9', border: '1px solid #4CAF50' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Resultados - Vista Simplificada
                  </Typography>
                  
                  {queryResults.data ? (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                      {queryResults.data.name && (
                        <Card sx={{ bgcolor: '#F1F8E9' }}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>Nombre</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {queryResults.data.name}
                            </Typography>
                          </CardContent>
                        </Card>
                      )}
                      
                      {queryResults.data.workers && (
                        <Card sx={{ bgcolor: '#E3F2FD' }}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>Trabajadores</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {queryResults.data.workers.toLocaleString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      )}
                      
                      {queryResults.data.avgSalary && (
                        <Card sx={{ bgcolor: '#FFF3E0' }}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>Salario Promedio</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              ${queryResults.data.avgSalary.toLocaleString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      )}

                      {queryResults.data.employed && (
                        <Card sx={{ bgcolor: '#E8F5E9' }}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>Empleados</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {queryResults.data.employed.toLocaleString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      )}

                      {queryResults.data.unemployed && (
                        <Card sx={{ bgcolor: '#FFEBEE' }}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>Desempleados</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#C62828' }}>
                              {queryResults.data.unemployed.toLocaleString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      )}

                      {queryResults.data.id && (
                        <Card sx={{ bgcolor: '#F3E5F5' }}>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>ID</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {queryResults.data.id}
                            </Typography>
                          </CardContent>
                        </Card>
                      )}
                    </Box>
                  ) : (
                    <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                      No hay datos disponibles para mostrar
                    </Typography>
                  )}
                </Paper>

                {/* JSON TÉCNICO */}
                <Paper sx={{ p: 2, bgcolor: '#f5f5f5', border: '1px solid #ddd' }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
                    Datos en Formato JSON (Técnico)
                  </Typography>
                  <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1, maxHeight: 300, overflow: 'auto', border: '1px solid #e0e0e0' }}>
                    <pre style={{ fontSize: '11px', margin: 0, fontFamily: 'monospace', color: '#333' }}>
                      {JSON.stringify(queryResults, null, 2)}
                    </pre>
                  </Box>
                </Paper>
              </Box>
            )}
          </Paper>
        </Box>
      )}

      {/* TAB 1: DATOS REALES DEL INE */}
      {tabValue === 1 && realData && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ mb: 3, p: 2, bgcolor: '#E3F2FD', borderRadius: 1, border: '1px solid #2196F3' }}>
            <Typography variant="body2" sx={{ color: '#1565C0', fontWeight: 'bold' }}>
              ✓ Fuente: Instituto Nacional de Estadísticas (INE)
            </Typography>
            <Typography variant="caption" sx={{ color: '#1565C0' }}>
              Última actualización: {realData.lastUpdated}
            </Typography>
          </Box>

          {/* ESTADÍSTICAS PRINCIPALES REALES */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#E8F5E9' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>Total Empleados</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {realData.statistics.totalEmployed.toLocaleString('es-ES')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#2E7D32' }}>Datos reales</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#FFEBEE' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>Desempleados</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#C62828' }}>
                    {realData.statistics.unemployed.toLocaleString('es-ES')}
                  </Typography>
                  <Typography variant="caption">Tasa: {realData.statistics.unemploymentRate}%</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#FCE4EC' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>Fuerza Laboral</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {realData.statistics.laborForce.toLocaleString('es-ES')}
                  </Typography>
                  <Typography variant="caption">Participación: {realData.statistics.participationRate}%</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#FFF3E0' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>Salario Promedio</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ${realData.statistics.averageSalary.toLocaleString('es-ES')}
                  </Typography>
                  <Typography variant="caption">CLP</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* EMPLEO POR ACTIVIDAD */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Empleo por Actividad Económica</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                    <TableCell><strong>Sector</strong></TableCell>
                    <TableCell align="right"><strong>Trabajadores</strong></TableCell>
                    <TableCell align="right"><strong>% del Total</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {realData.employmentByActivity.map((item, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{item.sector}</TableCell>
                      <TableCell align="right">{item.workers.toLocaleString('es-ES')}</TableCell>
                      <TableCell align="right"><strong>{item.percentage}%</strong></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* DESEMPLEO POR REGIÓN */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Tasa de Desempleo por Región</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                    <TableCell><strong>Región</strong></TableCell>
                    <TableCell align="right"><strong>Tasa (%)</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {realData.unemploymentByRegion.map((item, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{item.region}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: item.rate > 3.2 ? '#C62828' : '#2E7D32' }}>
                        {item.rate}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* SALARIO POR EDUCACIÓN */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Salario Promedio por Nivel de Educación</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                    <TableCell><strong>Nivel de Educación</strong></TableCell>
                    <TableCell align="right"><strong>Salario Promedio</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {realData.salaryByEducation.map((item, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{item.education}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                        ${item.salary.toLocaleString('es-ES')}
                      </TableCell>
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

export default EmploymentDashboard;
