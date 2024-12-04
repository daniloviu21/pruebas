const Ventas = require('../models/ventasModel');
const pool = require('../config/db');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

describe('Pruebas del modulo Ventas', () => {

    let queryStub;

    beforeEach(() => {
        queryStub = sinon.stub(pool, 'query');
    });

    afterEach(() => {
        queryStub.restore();
    });

    it('Debe crear una venta correctamente', async () => {
        const precioTotal = 1000;

        const ventaSimulada = {
            id: 1,
            precioTotal
        };

        queryStub.resolves({ rows: [ventaSimulada] });

        const venta = await Ventas.create(precioTotal);

        expect(venta).to.deep.equal(ventaSimulada);
        expect(queryStub.calledOnce).to.be.true;
    });

});
