const MarcasController = require('../controllers/marcasController');
const Marca = require('../models/marcasModel');
const pool = require('../config/db');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const { expect } = chai;

chai.use(chaiHttp);

describe('Pruebas del módulo marcas', () => {

    let queryStub;

    beforeEach(() => {
        queryStub = sinon.stub(pool, 'query');
    });

    afterEach(() => {
        queryStub.restore();
    });

    it('Debe obtener todas las marcas', async () => {
        const marcasSimuladas = [
            { id: 1, nombre: 'Marca A', descripcion: 'Descripcion A' },
            { id: 2, nombre: 'Marca B', descripcion: 'Descripcion B' }
        ];

        
        queryStub.resolves({ rows: marcasSimuladas });

        const res = await chai.request(app).get('/api/marcas');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(marcasSimuladas);
    });

    it('Debe crear una marca correctamente', async () => {
        const marcaSimulada = { nombre: 'Marca C', descripcion: 'Descripcion C' };
        const marcaCreada = { id: 3, ...marcaSimulada };

        
        queryStub.resolves({ rows: [marcaCreada] });

        const res = await chai.request(app).post('/api/marcas').send(marcaSimulada);

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.nombre).to.equal('Marca C');
        expect(res.body.descripcion).to.equal('Descripcion C');
    });


    it('Debe actualizar una marca correctamente', async () => {
        const marcaSimulada = { id: 1, nombre: 'Marca A', descripcion: 'Descripcion A' };
        const marcaActualizada = { id: 1, nombre: 'Marca A Actualizada', descripcion: 'Descripcion A Actualizada' };

        
        queryStub.resolves({ rows: [marcaActualizada] });

        const res = await chai.request(app).put('/api/marcas/1').send(marcaSimulada);

        expect(res.status).to.equal(200);
        expect(res.body.nombre).to.equal('Marca A Actualizada');
        expect(res.body.descripcion).to.equal('Descripcion A Actualizada');
    });

    it('Debe devolver un 404 si intenta actualizar una marca que no existe', async () => {
        const marcaSimulada = { nombre: 'Marca Inexistente', descripcion: 'Descripcion Inexistente' };

        
        queryStub.resolves({ rows: [] });

        const res = await chai.request(app).put('/api/marcas/999').send(marcaSimulada);

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Marca no encontrada!');
    });

    it('Debe eliminar una marca correctamente', async () => {
        const marcaSimulada = { id: 1, nombre: 'Marca A', descripcion: 'Descripcion A' };

        
        queryStub.resolves({ rows: [marcaSimulada] });

        const res = await chai.request(app).delete('/api/marcas/1');

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Marca eliminada!');
    });

    it('Debe devolver un 404 si intenta eliminar una marca que no existe', async () => {
        
        queryStub.resolves({ rows: [] });

        const res = await chai.request(app).delete('/api/marcas/999');

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Marca no encontrada!');
    });

});
