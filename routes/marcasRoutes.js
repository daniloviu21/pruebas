/**
 * @swagger
 * components:
 *   schemas:
 *     Marca:
 *       type: object
 *       required:
 *         - nombreMarca
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la marca
 *         nombreMarca:
 *           type: string
 *           description: Nombre de la marca
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la marca
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización de la marca
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación de la marca (si corresponde)
 *       example:
 *         id: 1
 *         nombreMarca: "Nike"
 *         created_at: "2024-11-13T00:00:00Z"
 *         updated_at: "2024-11-13T00:00:00Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/marcas:
 *   get:
 *     summary: Obtiene todas las marcas
 *     tags: [Marcas]
 *     responses:
 *       200:
 *         description: Lista de marcas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Marca'
 *       500:
 *         description: Error en el servidor
 * 
 *   post:
 *     summary: Crea una nueva marca
 *     tags: [Marcas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreMarca:
 *                 type: string
 *     responses:
 *       201:
 *         description: Marca creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Marca'
 *       400:
 *         description: Datos inválidos proporcionados
 *       500:
 *         description: Error en el servidor
 * 
 * /api/marcas/{id}:
 *   put:
 *     summary: Actualiza una marca por su ID
 *     tags: [Marcas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la marca a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreMarca:
 *                 type: string
 *     responses:
 *       200:
 *         description: Marca actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Marca'
 *       400:
 *         description: Datos inválidos proporcionados
 *       404:
 *         description: Marca no encontrada
 *       500:
 *         description: Error en el servidor
 * 
 *   delete:
 *     summary: Elimina una marca por su ID
 *     tags: [Marcas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la marca a eliminar
 *     responses:
 *       200:
 *         description: Marca eliminada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Marca'
 *       404:
 *         description: Marca no encontrada
 *       500:
 *         description: Error en el servidor
 */

const express = require('express');
const MarcasController = require('../controllers/marcasController');

const router = express.Router();

router.get('/marcas', MarcasController.getAllBrands);
router.post('/marcas', MarcasController.createBrand);
router.put('/marcas/:id', MarcasController.updateBrand);
router.delete('/marcas/:id', MarcasController.deleteBrand);

module.exports = router;
