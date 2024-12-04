const Productos = require('../models/productosModel');
const ProductosController = require('../controllers/productosController');
const pool = require('../config/db');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
chai.use(chaiHttp);
const expect = chai.expect;

describe('Pruebas del modulo productos', () => {

    let queryStub;

    beforeEach(() => {
        queryStub = sinon.stub(pool, 'query');
    });

    afterEach(() => {
        queryStub.restore();
    });

    it('Debe obtener la lista de productos', async () => {
        const productosSimulados = [
            { id: 1, nombreProducto: 'Producto 1', descripcion: 'Descripción 1', precio: 100, stock: 10, idMarca: 1, idCategoria: 1 },
            { id: 2, nombreProducto: 'Producto 2', descripcion: 'Descripción 2', precio: 150, stock: 5, idMarca: 2, idCategoria: 2 }
        ];

        
        queryStub.resolves({ rows: productosSimulados });

        const productos = await Productos.obtenerProductos();

        expect(productos).to.deep.equal(productosSimulados);
        expect(queryStub.calledOnce).to.be.true; 
    });

    it('Debe devolver un arreglo vacío si no hay productos', async () => {
        const productosSimulados = [
        ];

        
        queryStub.resolves({ rows: productosSimulados });

        const productos = await Productos.obtenerProductos();

        expect(productos).to.deep.equal(productosSimulados);
        expect(queryStub.calledOnce).to.be.true; 
    });

    it('Debe crear un producto correctamente', async () => {
        const datosProducto = {
            nombreProducto: 'Nuevo Producto',
            descripcion: 'Nueva descripción',
            precio: 200,
            stock: 20,
            idMarca: 1,
            idCategoria: 2
        };

        const productoSimulado = {
            id: 3,
            ...datosProducto
        };

        
        queryStub.resolves({ rows: [productoSimulado] });

        const productoCreado = await Productos.create(datosProducto);

        expect(productoCreado).to.deep.equal(productoSimulado);
        expect(queryStub.calledOnce).to.be.true;
    });


    it('Debe actualizar un producto correctamente', async () => {
        const datosActualizacion = {
            nombreProducto: 'Producto Actualizado',
            descripcion: 'Descripción Actualizada',
            precio: 250,
            stock: 15,
            idMarca: 1,
            idCategoria: 2
        };

        const productoActualizado = {
            id: 1,
            ...datosActualizacion
        };

        queryStub.resolves({ rows: [productoActualizado] });

        const producto = await Productos.update(1, datosActualizacion);

        expect(producto).to.deep.equal(productoActualizado);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe eliminar un producto correctamente', async () => {
        const productoEliminado = { id: 1, deleted_at: '2024-11-12' };

        queryStub.resolves({ rows: [productoEliminado] });

        const producto = await Productos.delete(1);

        expect(producto).to.deep.equal(productoEliminado);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe obtener un producto por su ID', async () => {
        const productoSimulado = { id: 1, nombreProducto: 'Producto 1', descripcion: 'Descripción 1', precio: 100, stock: 10, idMarca: 1, idCategoria: 1 };

        queryStub.resolves({ rows: [productoSimulado] });

        const producto = await Productos.getProductId(1);

        expect(producto).to.deep.equal(productoSimulado);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe actualizar el stock de un producto correctamente', async () => {
        const stockActualizado = { id: 1, stock: 30 };

        queryStub.resolves({ rows: [stockActualizado] });

        const producto = await Productos.updateStock(1, 30);

        expect(producto).to.deep.equal(stockActualizado);
        expect(queryStub.calledOnce).to.be.true;
    });

    it('Debe actualizar un producto correctamente', async () => {
        const datosActualizacion = {
            nombreProducto: 'Producto Actualizado',
            descripcion: 'Descripción Actualizada',
            precio: 250,
            stock: 15,
            idMarca: 1,
            idCategoria: 2
        };
    
        const productoActualizado = {
            id: 1,
            ...datosActualizacion
        };
    
        
        queryStub.resolves({ rows: [productoActualizado] });
    
        
        const res = await chai.request(app).put('/api/products/1').send(datosActualizacion);
    
        
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(productoActualizado);
    });
    
    it('Debe devolver un 404 si actualiza un producto que no existe', async () => {
        const datosActualizacion = {
            nombreProducto: 'Producto Inexistente',
            descripcion: 'Descripción Inexistente',
            precio: 300,
            stock: 10,
            idMarca: 3,
            idCategoria: 1
        };
    
        
        queryStub.resolves({ rows: [] });
        
        const res = await chai.request(app).put('/api/products/999').send(datosActualizacion);
    
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Product no encontrado!');
    });
    
    it('Debe obtener un producto por su ID', async () => {
        const productoSimulado = { id: 1, nombreProducto: 'Producto 1', descripcion: 'Descripción 1', precio: 100, stock: 10, idMarca: 1, idCategoria: 1 };
    
        queryStub.resolves({ rows: [productoSimulado] });
    
        const res = await chai.request(app).get('/api/products/1');
    
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(productoSimulado);
    });
    
    it('Debe devolver un 404 si busca un producto que no existe', async () => {
        
        queryStub.resolves({ rows: [] });
    
        const res = await chai.request(app).get('/api/products/999');
    
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Producto no encontrado!');
    });
    
});
