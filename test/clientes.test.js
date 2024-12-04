const ClientesController = require('../controllers/clientesController');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const pool = require('../config/db'); // Se asume que pool se usa en el controlador para la DB
const { expect } = chai;

chai.use(chaiHttp);

describe('Pruebas del modulo clientes', () => {

    let queryStub;

    beforeEach(() => {
        queryStub = sinon.stub(pool, 'query');
    });

    afterEach(() => {
        queryStub.restore();
    });

    it('Debe obtener todos los clientes', async () => {
        const clientesSimulados = [
            { id: 1, nombreCliente: 'Juan', apellidoP: 'Perez', apellidoM: 'Gomez', correo: 'juan@example.com', telefono: '1234567890', idUsuario: 1 },
            { id: 2, nombreCliente: 'Maria', apellidoP: 'Lopez', apellidoM: 'Garcia', correo: 'maria@example.com', telefono: '0987654321', idUsuario: 2 }
        ];

        queryStub.resolves({ rows: clientesSimulados });

        const res = await chai.request(app).get('/api/clientes');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(clientesSimulados);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe crear un cliente correctamente', async () => {
        const clienteSimulado = { nombreCliente: 'Juan', apellidoP: 'Perez', apellidoM: 'Gomez', correo: 'juan@example.com', telefono: '1234567890', idUsuario: 1 };
        const usuarioSimulado = { usuario: 'juan', contrasenia: '12345', idRol: 2 };

        const clienteCreado = { id: 1, ...clienteSimulado };
        const usuarioCreado = { id: 1, ...usuarioSimulado };

        queryStub.resolves({ rows: [clienteCreado] });

        const res = await chai.request(app).post('/api/clientes').send({ cliente: clienteSimulado, usuario: usuarioSimulado });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('cliente');
        expect(res.body).to.have.property('usuario');
        expect(res.body.cliente.id).to.equal(1);
        expect(res.body.usuario.id).to.equal(1);
        //expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe obtener un cliente por ID', async () => {
        const clienteSimulado = { id: 1, nombreCliente: 'Juan', apellidoP: 'Perez', apellidoM: 'Gomez', correo: 'juan@example.com', telefono: '1234567890', idUsuario: 1 };

        queryStub.resolves({ rows: [clienteSimulado] });

        const res = await chai.request(app).get('/api/clientes/1');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(clienteSimulado);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe eliminar un cliente y su usuario correctamente', async () => {
        const clienteSimulado = { id: 1, nombreCliente: 'Juan', apellidoP: 'Perez', apellidoM: 'Gomez', correo: 'juan@example.com', telefono: '1234567890', idUsuario: 1 };

        queryStub.resolves({ rows: [clienteSimulado] });

        const res = await chai.request(app).delete('/api/clientes/1');

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Cliente y usuario eliminados!');
        //expect(queryStub.calledOnce).to.be.true;
    });

});
