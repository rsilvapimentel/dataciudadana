import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material";
import {
  FavoriteBorder,
  School,
  LocalFlorist,
  TrendingUp,
  DirectionsBus,
  Search as SearchIcon,
  ArrowForward,
  Work,
  Security,
} from "@mui/icons-material";
import EmploymentDashboard from "./components/EmploymentDashboard";
import SecurityDashboard from "./components/SecurityDashboard";

function App() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  // Datos de categorías
  const categories = [
    { id: 1, name: "Salud", icon: FavoriteBorder, color: "#FFE0E6", iconColor: "#C2185B" },
    { id: 2, name: "Educación", icon: School, color: "#E0F2FE", iconColor: "#1565C0" },
    { id: 3, name: "Medio Ambiente", icon: LocalFlorist, color: "#E0F2E0", iconColor: "#2E7D32" },
    { id: 4, name: "Economía", icon: TrendingUp, color: "#FFF8E0", iconColor: "#F57F17" },
    { id: 5, name: "Transporte", icon: DirectionsBus, color: "#F0E0FF", iconColor: "#6A1B9A" },
  ];

  // Datos de últimos datasets
  const recentDatasets = [
    {
      id: 1,
      title: "Presupuesto Nacional 2025",
      ministry: "Ministerio de Hacienda",
      time: "Hace 2 horas",
      downloads: 1234,
    },
    {
      id: 2,
      title: "Indicadores de Salud Pública",
      ministry: "Ministerio de Salud",
      time: "Hace 5 horas",
      downloads: 892,
    },
    {
      id: 3,
      title: "Matrícula Escolar por Región",
      ministry: "Ministerio de Educación",
      time: "Hace 1 día",
      downloads: 567,
    },
    {
      id: 4,
      title: "Emisiones de CO2 2024",
      ministry: "Ministerio del Medio Ambiente",
      time: "Hace 2 días",
      downloads: 445,
    },
  ];

  const handleSearch = (e) => {
    console.log("Búsqueda:", search);
    // Aquí irá la lógica de búsqueda
  };

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* NAVBAR CON TABS */}
      <Box
        sx={{
          bgcolor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          sticky: 0,
          top: 0,
          zIndex: 100,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#1e40af",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                DC
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, color: "#1e40af" }}>
                  DataCiudadana
                </Typography>
                <Typography variant="caption" sx={{ color: "#666" }}>
                  Datos Públicos de Chile
                </Typography>
              </Box>
            </Box>
            <Tabs
              value={activeTab}
              onChange={(e, v) => setActiveTab(v)}
              sx={{ minWidth: "auto" }}
            >
              <Tab label="Inicio" />
              <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><Work sx={{ fontSize: 18 }} />Empleo</Box>} />
              <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><Security sx={{ fontSize: 18 }} />Seguridad</Box>} />
            </Tabs>
          </Box>
        </Container>
      </Box>

      {/* MOSTRAR CONTENIDO SEGÚN PESTAÑA */}
      {activeTab === 1 && <EmploymentDashboard />}
      {activeTab === 2 && <SecurityDashboard />}

      {activeTab === 0 && (
      <>
      {/* HERO SECTION */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
          color: "white",
          py: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                Transparencia en tus manos: explora los datos públicos de Chile
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, mb: 3, opacity: 0.95 }}>
                Accede a información pública verificada, comprende indicadores clave y participa
                activamente en la gestión democrática de tu país.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#10b981",
                    color: "white",
                    fontWeight: 600,
                    py: 1.5,
                    px: 3,
                    "&:hover": { bgcolor: "#059669" },
                  }}
                  endIcon={<ArrowForward />}
                >
                  Explorar Datos
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    fontWeight: 600,
                    py: 1.5,
                    px: 3,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Aprende Más
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  borderRadius: 3,
                  p: 4,
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage:
                    "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><rect fill=%22%23ffffff%22 opacity=%220.05%22 width=%22400%22 height=%22300%22/></svg>')",
                }}
              >
                <Typography sx={{ opacity: 0.7 }}>Imagen destacada</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* BUSCADOR */}
      <Box sx={{ bgcolor: "white", py: 4, boxShadow: "0 -2px 8px rgba(0,0,0,0.05)" }}>
        <Container maxWidth="lg">
          <TextField
            fullWidth
            placeholder="Buscar datos por tema, ministerio o palabra clave..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#999" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontSize: 16,
                py: 1.5,
              },
            }}
          />
        </Container>
      </Box>

      {/* CATEGORÍAS */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
            Explorar por Categoría
          </Typography>
          <Grid container spacing={3}>
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={cat.id}>
                  <Card
                    sx={{
                      bgcolor: cat.color,
                      border: "none",
                      cursor: "pointer",
                      transition: "transform 0.2s, boxShadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                      <Box sx={{ mb: 2 }}>
                        <IconComponent
                          sx={{
                            fontSize: 48,
                            color: "#d32f2f",
                          }}
                        />
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#333" }}>
                        {cat.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* ÚLTIMOS DATOS Y ESTADÍSTICAS */}
      <Box sx={{ py: 8, bgcolor: "#f0f4f8" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Últimos Datos */}
            <Grid item xs={12} md={7}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Últimos Datos Actualizados
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {recentDatasets.map((dataset) => (
                  <Card
                    key={dataset.id}
                    sx={{
                      p: 3,
                      cursor: "pointer",
                      transition: "boxShadow 0.2s, transform 0.2s",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {dataset.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                          {dataset.ministry}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#999" }}>
                          {dataset.time} • {dataset.downloads} descargas
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ ml: 2, textTransform: "none", fontWeight: 600 }}
                      >
                        Ver
                      </Button>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Grid>

            {/* Estadísticas */}
            <Grid item xs={12} md={5}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Estadísticas
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Paper
                  sx={{
                    bgcolor: "#1e40af",
                    color: "white",
                    p: 3,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Datasets
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    2,847
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    bgcolor: "#1e40af",
                    color: "white",
                    p: 3,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Usuarios Activos
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    45,231
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    bgcolor: "#1e40af",
                    color: "white",
                    p: 3,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Ministerios
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    24
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    bgcolor: "#10b981",
                    color: "white",
                    p: 3,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Actualizaciones hoy
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    127
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box sx={{ bgcolor: "#1e40af", color: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                DataCiudadana
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                Democratizando el acceso a los datos públicos de Chile para una ciudadanía más
                informada y participativa.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Enlaces
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 } }}>
                  Acerca de
                </Typography>
                <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 } }}>
                  Términos de uso
                </Typography>
                <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 } }}>
                  Privacidad
                </Typography>
                <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 } }}>
                  Contacto
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Recursos
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 } }}>
                  API Documentación
                </Typography>
                <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 } }}>
                  Guías
                </Typography>
                <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 } }}>
                  FAQ
                </Typography>
                <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 } }}>
                  datos.gob.cl
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Síguenos
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body2">En colaboración con:</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Gobierno de Chile
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Universidad de Valparaíso
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.2)",
              pt: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © 2025 DataCiudadana. Todos los derechos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
      </>
      )}
    </Box>
  );
}

export default App;
