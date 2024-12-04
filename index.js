const express = require('express');
const productosRoutes = require('./routes/productosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const serviciosRoutes = require('./routes/serviciosRoutes');
const ventasRoutes = require('./routes/ventasRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const departamentosRoutes = require('./routes/departamentosRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const marcasRoutes = require('./routes/marcasRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const empleadosRoutes = require('./routes/empleadosRoutes');
const cotizacionesRoutes = require('./routes/cotizacionesRoutes');
const swaggerDocs = require('./config/swagger');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
// Configurar Swagger
swaggerDocs(app);
app.use(express.json());

// Rutas de la API
app.use('/api', productosRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', serviciosRoutes);
app.use('/api', ventasRoutes);
app.use('/api', rolesRoutes);
app.use('/api', departamentosRoutes);
app.use('/api', categoriasRoutes);
app.use('/api', marcasRoutes);
app.use('/api', clientesRoutes);
app.use('/api', empleadosRoutes);
app.use('/api', cotizacionesRoutes);

module.exports = app;

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`);
});
