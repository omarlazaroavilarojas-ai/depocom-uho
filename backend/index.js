import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Configuración de CORS limpia
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ?? OBLIGAMOS A EXPRESS A SERVIR LA CARPETA PUBLIC PRIMERO CON UTF-8
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css; charset=utf-8');
  }
}));

// --- BASE DE DATOS EN MEMORIA ---
let solicitudes = [
  { id: "SOL-001", equipo: "PC Escritorio - Sede Central", motivo: "Fallo de Placa Base", estado: "Pendiente" }
];
let equiposDeposito = [
  { id: "DEP-001", tipo: "Computadora", marca: "ASUS", inventario: "UHO-10492", estado: "Para Despiece" },
  { id: "DEP-002", tipo: "Monitor", marca: "LG", inventario: "UHO-08321", estado: "Listo para Baja" }
];
let piezasAlmacen = [
  { id: "PIE-001", tipo: "RAM DDR4 8GB", estado: "Recuperado", ubicacion: "Estante A" },
  { id: "PIE-002", tipo: "HDD 1TB", estado: "Defectuoso", ubicacion: "Estante B" }
];
let despieces = [
  { id: "DES-001", equipo: "PC HP - UHO-0543", piezasExtraidas: "Fuente 400W, Disipador", tecnico: "Omar Lázaro" }
];

// --- ENDPOINTS DE LA API ---
app.get('/api/dashboard/stats', (req, res) => {
  res.json({ solicitudesContador: solicitudes.length, equiposContador: equiposDeposito.length, piezasContador: piezasAlmacen.length, despiecesContador: despieces.length });
});

app.get('/api/solicitudes', (req, res) => res.json(solicitudes));
app.post('/api/solicitudes', (req, res) => {
  const nueva = { id: `SOL-00${solicitudes.length + 1}`, equipo: req.body.equipo, motivo: req.body.motivo, estado: "Pendiente" };
  solicitudes.push(nueva);
  res.json(nueva);
});

app.get('/api/deposito', (req, res) => res.json(equiposDeposito));
app.post('/api/deposito', (req, res) => {
  const nuevo = { id: `DEP-00${equiposDeposito.length + 1}`, tipo: req.body.tipo, marca: req.body.marca, inventario: req.body.inventario, estado: req.body.estado };
  equiposDeposito.push(nuevo);
  res.json(nuevo);
});

app.get('/api/despiece', (req, res) => res.json(despieces));
app.post('/api/despiece', (req, res) => {
  const nuevo = { id: `DES-00${despieces.length + 1}`, equipo: req.body.equipo, piezasExtraidas: req.body.piezasExtraidas, tecnico: "Omar Lázaro" };
  despieces.push(nuevo);
  res.json(nuevo);
});

app.get('/api/almacen', (req, res) => res.json(piezasAlmacen));
app.post('/api/almacen', (req, res) => {
  const nueva = { id: `PIE-00${piezasAlmacen.length + 1}`, tipo: req.body.tipo, estado: req.body.estado, ubicacion: req.body.ubicacion };
  piezasAlmacen.push(nueva);
  res.json(nueva);
});

// ?? REGLA DE ORO: Si no es la API, sirve siempre el archivo index.html directamente de la raíz de public
// REEMPLÁZALO POR ESTO:
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`?? DepoCom UHO listo en http://localhost:${PORT}`);
});