const Usuarios = require('../models/usuariosModel');
const pool = require('../config/db');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

describe('Pruebas del modulo usuarios', () => {

    let queryStub;

    beforeEach(() => {
        queryStub = sinon.stub(pool, 'query');
    });

    afterEach(() => {
        queryStub.restore();
    });

    it('Debe obtener la lista de usuarios', async () => {
        const usuariosSimulados = [
            { id: 1, usuario: 'emmanuel', contrasenia: 'contraseña1', idRol: 1 },
            { id: 2, usuario: 'jaime', contrasenia: 'contraseña2', idRol: 2 }
        ];

        queryStub.resolves({ rows: usuariosSimulados });

        const usuarios = await Usuarios.obtenerUsuarios();

        expect(usuarios).to.deep.equal(usuariosSimulados);
        expect(queryStub.calledOnce).to.be.true; 
    });

    it('Debe crear un usuario correctamente', async () => {
        const datosUsuario = {
            usuario: 'nuevoemmanuel',
            contrasenia: 'nuevaContraseña',
            idRol: 2
        };

        const usuarioSimulado = {
            id: 3,
            ...datosUsuario
        };

        queryStub.resolves({ rows: [usuarioSimulado] });

        const usuarioCreado = await Usuarios.create(datosUsuario);

        expect(usuarioCreado).to.deep.equal(usuarioSimulado);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe actualizar un usuario correctamente', async () => {
        const datosActualizacion = {
            usuario: 'emmanuelActualizado',
            contrasenia: 'contraseñaActualizada',
            idRol: 2
        };

        const usuarioActualizado = {
            id: 1,
            ...datosActualizacion
        };

        queryStub.resolves({ rows: [usuarioActualizado] });

        const usuario = await Usuarios.update(1, datosActualizacion);

        expect(usuario).to.deep.equal(usuarioActualizado);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe eliminar un usuario correctamente', async () => {
        const usuarioEliminado = { id: 1, deleted_at: '2024-11-12' };

        queryStub.resolves({ rows: [usuarioEliminado] });

        const usuario = await Usuarios.delete(1);

        expect(usuario).to.deep.equal(usuarioEliminado);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe obtener un usuario por su ID', async () => {
        const usuarioSimulado = { id: 1, usuario: 'jaime', contrasenia: 'contraseña1', idRol: 1 };

        queryStub.resolves({ rows: [usuarioSimulado] });

        const usuario = await Usuarios.findById(1);

        expect(usuario).to.deep.equal(usuarioSimulado);
        expect(queryStub.calledOnce).to.be.true;
    });

});
