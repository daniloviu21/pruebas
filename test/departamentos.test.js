const pool = require('../config/db');
const Departamento = require('../models/departamentosModel');
const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);

describe('Pruebas del módulo DepartamentosController', () => {
    let queryStub;

    beforeEach(() => {
        sinon.restore();
        queryStub = sinon.stub(pool, 'query');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('Debe obtener todos los departamentos', async () => {
        const departamentosSimulados = [
            { id: 1, nombre: 'Departamento 1' },
            { id: 2, nombre: 'Departamento 2' }
        ];

        queryStub.resolves({ rows: departamentosSimulados });

        const res = await chai.request(app).get('/api/departamentos');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(departamentosSimulados);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe crear un departamento correctamente', async () => {
        const departamentoSimulado = { nombre: 'Nuevo Departamento' };
        const departamentoCreado = { id: 1, ...departamentoSimulado };

        queryStub.resolves({ rows: [departamentoCreado] });

        const res = await chai.request(app).post('/api/departamentos').send(departamentoSimulado);

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.nombre).to.equal(departamentoSimulado.nombre);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe actualizar un departamento correctamente', async () => {
        const departamentoSimulado = { nombre: 'Departamento Actualizado' };
        const departamentoActualizado = { id: 1, ...departamentoSimulado };

        queryStub.resolves({ rows: [departamentoActualizado] });

        const res = await chai.request(app).put('/api/departamentos/1').send(departamentoSimulado);

        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(departamentoActualizado.id);
        expect(res.body.nombre).to.equal(departamentoSimulado.nombre);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe devolver un 404 si intenta actualizar un departamento que no existe', async () => {
        const departamentoSimulado = { nombre: 'Departamento Inexistente' };

        queryStub.resolves({ rows: [] });

        const res = await chai.request(app).put('/api/departamentos/999').send(departamentoSimulado);

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Departamento no encontrado!');
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe eliminar un departamento correctamente', async () => {
        const departamentoSimulado = { id: 1, nombre: 'Departamento a Eliminar' };

        queryStub.resolves({ rows: [departamentoSimulado] });

        const res = await chai.request(app).delete('/api/departamentos/1');

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Departamento eliminado!');
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe devolver un 404 si intenta eliminar un departamento que no existe', async () => {
        queryStub.resolves({ rows: [] });

        const res = await chai.request(app).delete('/api/departamentos/999');

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Departamento no encontrado!');
        expect(queryStub.calledOnce).to.be.true;
    });
});
