/**
 * @swagger
 * components:
 *   schemas:
 *     Cotizacion:
 *       type: object
 *       required:
 *         - descripcion
 *         - precio
 *         - fecha
 *         - estatus
 *         - formaPago
 *         - idCliente
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la cotización
 *         descripcion:
 *           type: string
 *           description: Descripción de la cotización
 *         precio:
 *           type: number
 *           format: float
 *           description: Precio de la cotización
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de creación de la cotización
 *         estatus:
 *           type: string
 *           description: Estatus de la cotización
 *         formaPago:
 *           type: string
 *           description: Forma de pago de la cotización
 *         idCliente:
 *           type: integer
 *           description: ID del cliente asociado a la cotización
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la cotización
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización de la cotización
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación de la cotización (si corresponde)
 *       example:
 *         id: 1
 *         descripcion: "Cotización para impresión de lona"
 *         precio: 1200.50
 *         fecha: "2024-11-13"
 *         estatus: "Pendiente"
 *         formaPago: "Efectivo"
 *         idCliente: 2
 *         created_at: "2024-11-13T00:00:00Z"
 *         updated_at: "2024-11-13T00:00:00Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/cotizaciones:
 *   get:
 *     summary: Obtiene todas las cotizaciones
 *     tags: [Cotizaciones]
 *     responses:
 *       200:
 *         description: Lista de cotizaciones encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cotizacion'
 *       500:
 *         description: Error en el servidor
 * 
 *   post:
 *     summary: Crea una nueva cotización
 *     tags: [Cotizaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la cotización
 *               precio:
 *                 type: number
 *                 format: float
 *                 description: Precio de la cotización
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la cotización
 *               estatus:
 *                 type: string
 *                 description: Estatus de la cotización
 *               formaPago:
 *                 type: string
 *                 description: Forma de pago
 *               idCliente:
 *                 type: integer
 *                 description: ID del cliente asociado a la cotización
 *     responses:
 *       201:
 *         description: Cotización creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cotizacion'
 *       400:
 *         description: Datos inválidos proporcionados
 *       500:
 *         description: Error en el servidor
 * 
 * /api/cotizaciones/{id}:
 *   get:
 *     summary: Obtiene una cotización por su ID
 *     tags: [Cotizaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cotización
 *     responses:
 *       200:
 *         description: Cotización encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cotizacion'
 *       404:
 *         description: Cotización no encontrada
 *       500:
 *         description: Error en el servidor
 * 
 *   put:
 *     summary: Actualiza una cotización por su ID
 *     tags: [Cotizaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cotización a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la cotización
 *               precio:
 *                 type: number
 *                 format: float
 *                 description: Precio de la cotización
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la cotización
 *               estatus:
 *                 type: string
 *                 description: Estatus de la cotización
 *               formaPago:
 *                 type: string
 *                 description: Forma de pago
 *               idCliente:
 *                 type: integer
 *                 description: ID del cliente asociado
 *     responses:
 *       200:
 *         description: Cotización actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cotizacion'
 *       400:
 *         description: Datos inválidos proporcionados
 *       404:
 *         description: Cotización no encontrada
 *       500:
 *         description: Error en el servidor
 * 
 *   delete:
 *     summary: Elimina una cotización por su ID
 *     tags: [Cotizaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cotización a eliminar
 *     responses:
 *       200:
 *         description: Cotización eliminada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cotizacion'
 *       404:
 *         description: Cotización no encontrada
 *       500:
 *         description: Error en el servidor
 */

const express = require('express');
const CotizacionesController = require('../controllers/cotizacionesController');

const router = express.Router();

router.get('/cotizaciones', CotizacionesController.getAllQuotes);
router.post('/cotizaciones', CotizacionesController.create);
router.put('/cotizaciones/:id', CotizacionesController.update);
router.delete('/cotizaciones/:id', CotizacionesController.delete);

module.exports = router;
