const Categoria = require('../models/categoriasModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../index');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Pruebas del modulo categorias', () => {
    let queryStub;

    beforeEach(() => {
        queryStub = sinon.stub(Categoria, 'obtenerCategorias');
    });

    afterEach(() => {
        queryStub.restore();
    });

    it('Debe obtener todas las categorías correctamente', async () => {
        const categoriasSimuladas = [
            { id: 1, nombreCategoria: 'Electrónica', descripcion: 'Dispositivos electrónicos' },
            { id: 2, nombreCategoria: 'Ropa', descripcion: 'Prendas de vestir' }
        ];

        
        queryStub.resolves(categoriasSimuladas);


        const res = await chai.request(app).get('/api/categorias'); 
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(categoriasSimuladas);
    });

    it('Debe manejar error al obtener categorías', async () => {
        
        queryStub.rejects(new Error('Error al obtener categorías'));

        const res = await chai.request(app).get('/api/categorias');
        expect(res.status).to.equal(500);
        expect(res.body.error).to.equal('Error al obtener categorías');
    });

    it('Debe crear una categoría correctamente', async () => {
        const nuevaCategoria = {
            nombreCategoria: 'Ejemplo',
            descripcion: 'Descripcion de ejemplo'
        };

        const categoriaCreada = { id: 3, ...nuevaCategoria };

        
        sinon.stub(Categoria, 'create').resolves(categoriaCreada);

        const res = await chai.request(app).post('/api/categorias').send(nuevaCategoria);
        expect(res.status).to.equal(201);
        expect(res.body).to.deep.equal(categoriaCreada);

        Categoria.create.restore();
    });

    it('Debe manejar error al crear una categoría', async () => {
        const nuevaCategoria = { nombreCategoria: 'Ejemplo', descripcion: 'Descripcion de ejemplo' };

        
        sinon.stub(Categoria, 'create').rejects(new Error('Error al crear categoría'));

        const res = await chai.request(app).post('/api/categorias').send(nuevaCategoria);
        expect(res.status).to.equal(500);
        expect(res.body.error).to.equal('Error al crear categoría');

        Categoria.create.restore();
    });

    it('Debe actualizar una categoría correctamente', async () => {
        const datosActualizacion = {
            nombreCategoria: 'Ejemplo',
            descripcion: 'Descripcion de ejemplo'
        };

        const categoriaActualizada = {
            id: 1,
            nombreCategoria: 'Ejemplo',
            descripcion: 'Descripcion de ejemplo'
        };

        
        sinon.stub(Categoria, 'update').resolves(categoriaActualizada);

        const res = await chai.request(app).put('/api/categorias/1').send(datosActualizacion);
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(categoriaActualizada);

        Categoria.update.restore(); 
    });

    it('Debe devolver 404 si no se encuentra la categoría para actualizar', async () => {
        const datosActualizacion = { nombreCategoria: 'Ejemplo', descripcion: 'Descripcion de ejemplo no tengo creatividad para inventar algo' };

        
        sinon.stub(Categoria, 'update').resolves(null);

        const res = await chai.request(app).put('/api/categorias/999').send(datosActualizacion);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Categoria no encontrada!');

        Categoria.update.restore();
    });

    it('Debe eliminar una categoría correctamente', async () => {
        const categoriaEliminada = { id: 1, deleted_at: '2024-11-12' };

        
        sinon.stub(Categoria, 'delete').resolves(categoriaEliminada);

        const res = await chai.request(app).delete('/api/categorias/1');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Categoria eliminada!');

        Categoria.delete.restore();
    });

    it('Debe devolver 404 si no se encuentra la categoría para eliminar', async () => {
        
        sinon.stub(Categoria, 'delete').resolves(null);

        const res = await chai.request(app).delete('/api/categorias/999');
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Categoria no encontrada!');

        Categoria.delete.restore();
    });

});
