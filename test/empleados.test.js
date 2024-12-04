const EmpleadosController = require('../controllers/empleadosController');
const Empleados = require('../models/empleadosModel');
const Usuarios = require('../models/usuariosModel');
const pool = require('../config/db');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const { expect } = chai;

chai.use(chaiHttp);

describe('Pruebas del módulo empleados', () => {

    let queryStub;

    beforeEach(() => {
        queryStub = sinon.stub(pool, 'query');
    });

    afterEach(() => {
        queryStub.restore();
    });

    it('Debe obtener todos los empleados', async () => {
        const empleadosSimulados = [
            { id: 1, nombre: 'Juan', apellidoP: 'Perez', apellidoM: 'Gomez', telefono: '1234567890', correo: 'juan@example.com', idUsuario: 1, idDepartamento: 1 },
            { id: 2, nombre: 'Maria', apellidoP: 'Lopez', apellidoM: 'Garcia', telefono: '0987654321', correo: 'maria@example.com', idUsuario: 2, idDepartamento: 2 }
        ];

        
        queryStub.resolves({ rows: empleadosSimulados });

        const res = await chai.request(app).get('/api/empleados');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(empleadosSimulados);
    });

    it('Debe crear un empleado correctamente', async () => {
        const empleadoSimulado = { nombre: 'Juan', apellidoP: 'Perez', apellidoM: 'Gomez', telefono: '1234567890', correo: 'juan@example.com', fechanac: '1990-01-01', idDepartamento: 1, idUsuario: 1 };
        const usuarioSimulado = { usuario: 'juan', contrasenia: '12345', idRol: 2 };
        const empleadoCreado = { id: 1, ...empleadoSimulado };
        const usuarioCreado = { id: 1, ...usuarioSimulado };

        
        queryStub.onFirstCall().resolves({ rows: [usuarioCreado] });
        queryStub.onSecondCall().resolves({ rows: [empleadoCreado] });

        const res = await chai.request(app).post('/api/empleados').send({ empleado: empleadoSimulado, usuario: usuarioSimulado });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('empleado');
        expect(res.body).to.have.property('usuario');
        expect(res.body.empleado.id).to.equal(1);
        expect(res.body.usuario.id).to.equal(1);
    });

    it('Debe obtener un empleado por ID', async () => {
        const empleadoSimulado = { id: 1, nombre: 'Juan', apellidoP: 'Perez', apellidoM: 'Gomez', telefono: '1234567890', correo: 'juan@example.com', idUsuario: 1, idDepartamento: 1 };

        
        queryStub.resolves({ rows: [empleadoSimulado] });

        const res = await chai.request(app).get('/api/empleados/1');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(empleadoSimulado);
    });

    it('Debe devolver un 404 si no encuentra un empleado por ID', async () => {
        
        queryStub.resolves({ rows: [] });

        const res = await chai.request(app).get('/api/empleados/999');

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Empleado no encontrado!');
    });

    it('Debe eliminar un empleado y su usuario correctamente', async () => {
        const empleadoSimulado = { id: 1, nombre: 'Juan', apellidoP: 'Perez', apellidoM: 'Gomez', telefono: '1234567890', correo: 'juan@example.com', idUsuario: 1, idDepartamento: 1 };
        const usuarioSimulado = { id: 1, usuario: 'juan', contrasenia: '12345', idRol: 2 };

        
        queryStub.onFirstCall().resolves({ rows: [empleadoSimulado] });
        queryStub.onSecondCall().resolves({ rows: [usuarioSimulado] });
        queryStub.onThirdCall().resolves({ rows: [] });

        const res = await chai.request(app).delete('/api/empleados/1');

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Empleado y usuario eliminados!');
    });

    it('Debe devolver un 404 si intenta eliminar un empleado que no existe', async () => {
        
        queryStub.resolves({ rows: [] });

        const res = await chai.request(app).delete('/api/empleados/999');

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Empleado no encontrado!');
    });

});
