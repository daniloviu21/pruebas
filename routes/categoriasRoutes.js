/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       required:
 *         - nombreCategoria
 *         - descripcion
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la categoría
 *         nombreCategoria:
 *           type: string
 *           description: Nombre de la categoría
 *         descripcion:
 *           type: string
 *           description: Descripción de la categoría
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la categoría
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización de la categoría
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación de la categoría (si corresponde)
 *       example:
 *         id: 1
 *         nombreCategoria: "Electrónica"
 *         descripcion: "Categoría para productos electrónicos"
 *         created_at: "2024-11-13T00:00:00Z"
 *         updated_at: "2024-11-13T00:00:00Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorías encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Error en el servidor
 * 
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCategoria:
 *                 type: string
 *                 description: Nombre de la categoría
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la categoría
 *     responses:
 *       201:
 *         description: La categoría ha sido creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Datos inválidos proporcionados
 *       500:
 *         description: Error en el servidor
 * 
 * /api/categorias/{id}:
 *   put:
 *     summary: Actualiza una categoría por su ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCategoria:
 *                 type: string
 *                 description: Nombre de la categoría
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la categoría
 *     responses:
 *       200:
 *         description: La categoría ha sido actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Datos inválidos proporcionados
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error en el servidor
 * 
 *   delete:
 *     summary: Elimina una categoría por su ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría a eliminar
 *     responses:
 *       200:
 *         description: La categoría ha sido eliminada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error en el servidor
 */

const express = require('express');
const CategoriasController = require('../controllers/categoriasController');

const router = express.Router();

router.get('/categorias', CategoriasController.getAllCategories);
router.post('/categorias', CategoriasController.createCategorie);
router.put('/categorias/:id', CategoriasController.updateCategorie);
router.delete('/categorias/:id', CategoriasController.deleteCategorie);

module.exports = router;
