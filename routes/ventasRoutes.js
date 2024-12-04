/**
 * @swagger
 * components:
 *   schemas:
 *     Venta:
 *       type: object
 *       required:
 *         - precioTotal
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la venta
 *         precioTotal:
 *           type: number
 *           format: float
 *           description: El precio total de la venta
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la venta
 *       example:
 *         id: 1
 *         precioTotal: 150.75
 *         created_at: "2024-11-13T00:00:00Z"
 */

/**
 * @swagger
 * /api/ventas:
 *   post:
 *     summary: Crea una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               details:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     IdProducto:
 *                       type: integer
 *                     cantidad:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Venta creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       400:
 *         description: Datos inválidos proporcionados
 *       500:
 *         description: Error en el servidor
 */

const express = require('express');
const VentasController = require('../controllers/ventasController');

const router = express.Router();

router.post('/ventas', VentasController.createSale);

module.exports = router;
