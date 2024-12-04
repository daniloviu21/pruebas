/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - nombreProducto
 *         - descripcion
 *         - precio
 *         - stock
 *         - idMarca
 *         - idCategoria
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del producto
 *         nombreProducto:
 *           type: string
 *           description: Nombre del producto
 *         descripcion:
 *           type: string
 *           description: Descripción del producto
 *         precio:
 *           type: number
 *           format: float
 *           description: Precio del producto
 *         stock:
 *           type: integer
 *           description: Stock disponible del producto
 *         idMarca:
 *           type: integer
 *           description: ID de la marca asociada al producto
 *         idCategoria:
 *           type: integer
 *           description: ID de la categoría asociada al producto
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del producto
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del producto
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación del producto (si corresponde)
 *       example:
 *         id: 1
 *         nombreProducto: "Lona Publicitaria"
 *         descripcion: "Lona de alta calidad para anuncios exteriores."
 *         precio: 150.00
 *         stock: 20
 *         idMarca: 2
 *         idCategoria: 3
 *         created_at: "2024-11-13T00:00:00Z"
 *         updated_at: "2024-11-13T00:00:00Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *       500:
 *         description: Error en el servidor
 * 
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreProducto:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *                 format: float
 *               stock:
 *                 type: integer
 *               idMarca:
 *                 type: integer
 *               idCategoria:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       400:
 *         description: Datos inválidos proporcionados
 *       500:
 *         description: Error en el servidor
 * 
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a obtener
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 *   put:
 *     summary: Actualiza un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreProducto:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *                 format: float
 *               stock:
 *                 type: integer
 *               idMarca:
 *                 type: integer
 *               idCategoria:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       400:
 *         description: Datos inválidos proporcionados
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 *   delete:
 *     summary: Elimina un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */

const express = require('express');
const ProductosController = require('../controllers/productosController');

const router = express.Router();

router.get('/products', ProductosController.getAllProducts);
router.get('/products/:id', ProductosController.getProductById);
router.post('/products', ProductosController.createProduct);
router.put('/products/:id', ProductosController.updateProduct);
router.delete('/products/:id', ProductosController.deleteProduct);

module.exports = router;
