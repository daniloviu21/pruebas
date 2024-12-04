const express = require('express');
const ClientesController = require('../controllers/clientesController');

const router = express.Router();

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtiene todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Error en el servidor
 */
router.get('/clientes', ClientesController.getAllClients);

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crea un nuevo cliente y su usuario
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: object
 *                 properties:
 *                   nombreCliente:
 *                     type: string
 *                   apellidoP:
 *                     type: string
 *                   apellidoM:
 *                     type: string
 *                   correo:
 *                     type: string
 *                   telefono:
 *                     type: string
 *               usuario:
 *                 type: object
 *                 properties:
 *                   usuario:
 *                     type: string
 *                   contrasenia:
 *                     type: string
 *                   idRol:
 *                     type: integer
 *     responses:
 *       201:
 *         description: Cliente y usuario creados con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Datos inválidos proporcionados
 *       500:
 *         description: Error en el servidor
 */
router.post('/clientes', ClientesController.createClient);

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtiene un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/clientes/:id', ClientesController.getClientById);

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualiza un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCliente:
 *                 type: string
 *                 description: Nombre del cliente
 *               apellidoP:
 *                 type: string
 *                 description: Apellido paterno del cliente
 *               apellidoM:
 *                 type: string
 *                 description: Apellido materno del cliente
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del cliente
 *               telefono:
 *                 type: string
 *                 description: Teléfono del cliente
 *               idUsuario:
 *                 type: integer
 *                 description: ID del usuario asociado al cliente
 *               publicId:
 *                 type: string
 *                 description: Id cloudinary
 *     responses:
 *       200:
 *         description: Cliente actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Datos inválidos proporcionados
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/clientes/:id', ClientesController.updateClient);


/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Elimina un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/clientes/:id', ClientesController.deleteClientAndUser);

module.exports = router;
