const pool = require('../config/db');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const { expect } = chai;

chai.use(chaiHttp);

describe('Pruebas del módulo Roles', () => {
    let queryStub;

    beforeEach(() => {
        queryStub = sinon.stub(pool, 'query');
    });

    afterEach(() => {
        queryStub.restore();
    });

    it('Debe obtener todos los roles', async () => {
        const rolesSimulados = [
            { id: 1, rol: 'Administrador' },
            { id: 2, rol: 'Usuario' }
        ];

        queryStub.resolves({ rows: rolesSimulados });

        const res = await chai.request(app).get('/api/roles');
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(rolesSimulados);
    });

    it('Debe crear un rol correctamente', async () => {
        const nuevoRol = { rol: 'Supervisor' };
        const rolCreado = { id: 3, ...nuevoRol };

        queryStub.resolves({ rows: [rolCreado] });

        const res = await chai.request(app).post('/api/roles').send(nuevoRol);
        expect(res.status).to.equal(201);
        expect(res.body).to.deep.equal(rolCreado);
    });

    it('Debe actualizar un rol correctamente', async () => {
        const rolActualizado = { id: 1, rol: 'Administrador Actualizado' };

        queryStub.resolves({ rows: [rolActualizado] });

        const res = await chai.request(app).put('/api/roles/1').send({ rol: 'Administrador Actualizado' });
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(rolActualizado);
    });

    it('Debe devolver un 404 si intenta actualizar un rol que no existe', async () => {
        queryStub.resolves({ rows: [] });

        const res = await chai.request(app).put('/api/roles/999').send({ rol: 'Inexistente' });
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Rol no encontrado!');
    });

    it('Debe eliminar un rol correctamente', async () => {
        const rolEliminado = { id: 1, deleted_at: '2024-11-27' };

        queryStub.resolves({ rows: [rolEliminado] });

        const res = await chai.request(app).delete('/api/roles/1');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Rol eliminado!');
    });

    it('Debe devolver un 404 si intenta eliminar un rol que no existe', async () => {
        queryStub.resolves({ rows: [] });

        const res = await chai.request(app).delete('/api/roles/999');
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Rol no encontrado!');
    });
});
