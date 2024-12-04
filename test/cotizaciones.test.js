const CotizacionesController = require('../controllers/cotizacionesController');
const Cotizacion = require('../models/cotizacionesModel');
const pool = require('../config/db');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
chai.use(chaiHttp);
const expect = chai.expect;

describe('Pruebas del modulo cotizaciones', () => {

    let queryStub;

    beforeEach(() => {
        queryStub = sinon.stub(pool, 'query');
    });

    afterEach(() => {
        queryStub.restore();
    });

    it('Debe obtener todas las cotizaciones', async () => {
        const cotizacionesSimuladas = [
            { id: 1, descripcion: 'Cotización 1', precio: 100, fecha: '2024-11-01', estatus: 'pendiente', formaPago: 'contado', idCliente: 1 },
            { id: 2, descripcion: 'Cotización 2', precio: 200, fecha: '2024-11-02', estatus: 'aprobada', formaPago: 'crédito', idCliente: 2 }
        ];

        queryStub.resolves({ rows: cotizacionesSimuladas });

        const res = await chai.request(app).get('/api/cotizaciones');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(cotizacionesSimuladas);
    });

    it('Debe devolver un arreglo vacío si no hay cotizaciones', async () => {
        const cotizacionesSimuladas = [];

        queryStub.resolves({ rows: cotizacionesSimuladas });

        const res = await chai.request(app).get('/api/cotizaciones');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(cotizacionesSimuladas);
    });

    it('Debe crear una cotización correctamente', async () => {
        const cotizacionDatos = {
            descripcion: 'Nueva cotización',
            precio: 300,
            fecha: '2024-11-12',
            estatus: 'pendiente',
            formaPago: 'contado',
            idCliente: 1
        };

        const cotizacionSimulada = {
            id: 3,
            ...cotizacionDatos
        };

        queryStub.resolves({ rows: [cotizacionSimulada] });

        const res = await chai.request(app).post('/api/cotizaciones').send(cotizacionDatos);

        expect(res.status).to.equal(201);
        expect(res.body).to.deep.equal(cotizacionSimulada);
    });

    it('Debe actualizar una cotización correctamente', async () => {
        const cotizacionActualizadaDatos = {
            descripcion: 'Cotización actualizada',
            precio: 350,
            fecha: '2024-11-15',
            estatus: 'aprobada',
            formaPago: 'crédito',
            idCliente: 2
        };

        const cotizacionActualizada = {
            id: 1,
            ...cotizacionActualizadaDatos
        };

        queryStub.resolves({ rows: [cotizacionActualizada] });

        const res = await chai.request(app).put('/api/cotizaciones/1').send(cotizacionActualizadaDatos);

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(cotizacionActualizada);
    });

    it('Debe devolver un 404 si intenta actualizar una cotización que no existe', async () => {
        const cotizacionActualizadaDatos = {
            descripcion: 'Cotización inexistente',
            precio: 400,
            fecha: '2024-11-16',
            estatus: 'pendiente',
            formaPago: 'contado',
            idCliente: 3
        };

        queryStub.resolves({ rows: [] });

        const res = await chai.request(app).put('/api/cotizaciones/999').send(cotizacionActualizadaDatos);

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Cotización no encontrada!');
    });

    it('Debe eliminar una cotización correctamente', async () => {
        const cotizacionEliminada = { id: 1, deleted_at: '2024-11-12' };

        queryStub.resolves({ rows: [cotizacionEliminada] });

        const res = await chai.request(app).delete('/api/cotizaciones/1');

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Cotización eliminada');
    });

    it('Debe devolver un 404 si intenta eliminar una cotización que no existe', async () => {
        queryStub.resolves({ rows: [] });

        const res = await chai.request(app).delete('/api/cotizaciones/999');

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Cotización no encontrada!');
    });



});
