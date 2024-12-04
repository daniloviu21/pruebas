const Servicios = require('../models/serviciosModel');
const pool = require('../config/db');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
chai.use(chaiHttp);
const expect = chai.expect;

describe('Pruebas del modulo servicios', () => {

    let queryStub;

    beforeEach(() => {
        queryStub = sinon.stub(pool, 'query');
    });

    afterEach(() => {
        queryStub.restore();
    });

    it('Debe obtener la lista de servicios', async () => {
        const serviciosSimulados = [
            { id: 1, nombreServicio: 'Servicio 1', descripcion: 'Descripción 1', precio: 100 },
            { id: 2, nombreServicio: 'Servicio 2', descripcion: 'Descripción 2', precio: 150 }
        ];

        queryStub.resolves({ rows: serviciosSimulados });

        const servicios = await Servicios.obtenerServicios();

        expect(servicios).to.deep.equal(serviciosSimulados);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe crear un servicio correctamente', async () => {
        const datosServicio = {
            nombreServicio: 'Nuevo Servicio',
            descripcion: 'Descripción Nueva',
            precio: 200
        };

        const servicioSimulado = { id: 3, ...datosServicio };

        queryStub.resolves({ rows: [servicioSimulado] });

        const servicioCreado = await Servicios.create(datosServicio);

        expect(servicioCreado).to.deep.equal(servicioSimulado);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe actualizar un servicio correctamente', async () => {
        const datosActualizacion = {
            nombreServicio: 'Servicio Actualizado',
            descripcion: 'Descripción Actualizada',
            precio: 250
        };

        const servicioActualizado = { id: 1, ...datosActualizacion };

        queryStub.resolves({ rows: [servicioActualizado] });

        const servicio = await Servicios.update(1, datosActualizacion);

        expect(servicio).to.deep.equal(servicioActualizado);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe eliminar un servicio correctamente', async () => {
        const servicioEliminado = { id: 1, deleted_at: '2024-11-12' };

        queryStub.resolves({ rows: [servicioEliminado] });

        const servicio = await Servicios.delete(1);

        expect(servicio).to.deep.equal(servicioEliminado);
        expect(queryStub.calledOnce).to.be.true;
    });

});
