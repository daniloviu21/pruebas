/**
 * @swagger
 * components:
 *   schemas:
 *     Servicio:
 *       type: object
 *       required:
 *         - nombreServicio
 *         - descripcion
 *         - precio
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del servicio
 *         nombreServicio:
 *           type: string
 *           description: Nombre del servicio
 *         descripcion:
 *           type: string
 *           description: Descripción del servicio
 *         precio:
 *           type: number
 *           format: float
 *           description: Precio del servicio
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del servicio
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del servicio
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación del servicio (si corresponde)
 *       example:
 *         id: 1
 *         nombreServicio: "Instalación de anuncios"
 *         descripcion: "Instalación de anuncios luminosos personalizados"
 *         precio: 150.00
 *         created_at: "2024-11-13T00:00:00Z"
 *         updated_at: "2024-11-13T00:00:00Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Obtiene todos los servicios
 *     tags: [Servicios]
 *     responses:
 *       200:
 *         description: Lista de servicios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Servicio'
 *       500:
 *         description: Error en el servidor
 * 
 *   post:
 *     summary: Crea un nuevo servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreServicio:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Servicio creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       400:
 *         description: Datos inválidos proporcionados
 *       500:
 *         description: Error en el servidor
 * 
 * /api/services/{id}:
 *   put:
 *     summary: Actualiza un servicio por su ID
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del servicio a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreServicio:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Servicio actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       400:
 *         description: Datos inválidos proporcionados
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 *   delete:
 *     summary: Elimina un servicio por su ID
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del servicio a eliminar
 *     responses:
 *       200:
 *         description: Servicio eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error en el servidor
 */

const express = require('express');
const ServiciosController = require('../controllers/serviciosController');

const router = express.Router();

router.get('/services', ServiciosController.getAllServices);
router.post('/services', ServiciosController.createService);
router.put('/services/:id', ServiciosController.updateService);
router.delete('/services/:id', ServiciosController.deleteService);

module.exports = router;
