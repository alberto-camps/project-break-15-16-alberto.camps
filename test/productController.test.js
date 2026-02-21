/**
 * BONUS
 * productController.test.js
 * Pruebas unitarias del productController
 */

const home = require('../helpers/home');
const productController = require('../controllers/productController');
const ProductModel = require('../models/Product');
const productViewDashboard = require('../helpers/productViewDashboard');
const getProductCards = require('../helpers/getProductCards');
const template = require('../helpers/template')
const cloudinary = require('../config/cloudinary')

jest.mock('../helpers/home');
jest.mock('../models/Product');
jest.mock('../helpers/getProductCards');
jest.mock('../helpers/template');
jest.mock('../helpers/productViewDashboard')
jest.mock('../config/cloudinary')

// ShowHome
describe('showHome', () => {

  it('debería enviar el HTML generado por home', () => {

    const fakeHtml = '<h1>Home</h1>';

    home.mockReturnValue(fakeHtml);

    const req = {};

    const res = {
      send: jest.fn()
    };

    productController.showHome(req, res);

    expect(home).toHaveBeenCalledWith(req);
    expect(res.send).toHaveBeenCalledWith(fakeHtml);

  });

});


// showProductsHtml
describe('showProductsHtml', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería filtrar productos por categoría', async () => {
    const req = {
      query: { category: 'Camisetas' }
    };

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    ProductModel.find.mockResolvedValue([]);
    getProductCards.mockReturnValue('');
    template.mockReturnValue('<html></html>');

    await productController.showProductsHtml(req, res);

    expect(ProductModel.find).toHaveBeenCalledWith({ category: 'Camisetas' });
  });

  it('debería devolver 500 si ocurre un error', async () => {
    const req = { query: {} };

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    ProductModel.find.mockRejectedValue(new Error('DB error'));

    await productController.showProductsHtml(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error al cargar productos');
  });

});

//ShowDashboardProductById
describe('showDasboardProductById', () => {

  it('debería devolver el HTML del producto si existe', async () => {

    const fakeProduct = { _id: '123', name: 'Camiseta' };
    const fakeHtml = '<html>Producto</html>';

    ProductModel.findById.mockResolvedValue(fakeProduct);
    productViewDashboard.mockReturnValue(fakeHtml);

    const req = {
      params: { productId: '123' }
    };

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await productController.showDasboardProductById(req, res);

    expect(ProductModel.findById).toHaveBeenCalledWith('123');
    expect(productViewDashboard).toHaveBeenCalledWith(fakeProduct, req);
    expect(res.send).toHaveBeenCalledWith(fakeHtml);
  });

    it('debería devolver 404 si el producto no existe', async () => {

    ProductModel.findById.mockResolvedValue(null);

    const req = {
      params: { productId: '999' }
    };

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await productController.showDasboardProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Producto no encontrado");
  });

    it('debería devolver 500 si ocurre un error', async () => {

    ProductModel.findById.mockRejectedValue(new Error('DB error'));

    const req = {
      params: { productId: '123' }
    };

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await productController.showDasboardProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Error while loading product details");
  });

});

// createProduct
describe('createProduct', () => {

  it('debería crear un producto y redirigir al dashboard', async () => {

    const fakeImageUrl = 'http://cloudinary.com/fake-image.jpg';

    cloudinary.uploader = {
      upload: jest.fn().mockResolvedValue({
        secure_url: fakeImageUrl
      })
    };

    ProductModel.create.mockResolvedValue({ _id: '123' });

    const req = {
      body: {
        name: 'Camiseta',
        description: 'Negra',
        category: 'Camisetas',
        price: '25',
        size: 'M'
      },
      file: {
        path: '/fake/path/image.jpg'
      }
    };

    const res = {
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await productController.createProduct(req, res);

    expect(cloudinary.uploader.upload)
      .toHaveBeenCalledWith('/fake/path/image.jpg');

    expect(ProductModel.create).toHaveBeenCalledWith({
      name: 'Camiseta',
      description: 'Negra',
      image: fakeImageUrl,
      category: 'Camisetas',
      size: 'M',
      price: 25
    });

    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
  });

    it('debería devolver 500 si ocurre un error', async () => {

    cloudinary.uploader = {
      upload: jest.fn().mockRejectedValue(new Error('Upload error'))
    };

    const req = {
      body: {},
      file: { path: '/fake/path/image.jpg' }
    };

    const res = {
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await productController.createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error while creating product"
    });
  });

});

//updateProduct
describe('updateProduct', () => {

  it('debería actualizar el producto y redirigir', async () => {

    const fakeUpdatedProduct = {
      _id: '123',
      name: 'Nueva Camiseta'
    };

    ProductModel.findByIdAndUpdate.mockResolvedValue(fakeUpdatedProduct);

    const req = {
      params: { productId: '123' },
      body: {
        name: 'Nueva Camiseta',
        description: 'Actualizada',
        image: 'img.jpg',
        category: 'Camisetas',
        price: 30,
        size: 'L'
      }
    };

    const res = {
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await productController.updateProduct(req, res);

    expect(ProductModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '123',
      {
        name: 'Nueva Camiseta',
        description: 'Actualizada',
        image: 'img.jpg',
        category: 'Camisetas',
        price: 30,
        size: 'L'
      },
      { new: true }
    );

    expect(res.redirect).toHaveBeenCalledWith('/dashboard/123');
  });

  it('debería devolver 500 si ocurre un error', async () => {

    ProductModel.findByIdAndUpdate
      .mockRejectedValue(new Error('DB error'));

    const req = {
      params: { productId: '123' },
      body: {}
    };

    const res = {
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await productController.updateProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error while updating product"
    });
  });

});



//deleteProduct
describe('deleteProduct', () => {

  it('debería eliminar el producto y redirigir al dashboard', async () => {

    ProductModel.findByIdAndDelete.mockResolvedValue({
      _id: '123',
      name: 'Camiseta'
    });

    const req = {
      params: { productId: '123' }
    };

    const res = {
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await productController.deleteProduct(req, res);

    expect(ProductModel.findByIdAndDelete)
      .toHaveBeenCalledWith('123');

    expect(res.redirect)
      .toHaveBeenCalledWith('/dashboard');
  });

  it('debería devolver 404 si el producto no existe', async () => {

    ProductModel.findByIdAndDelete.mockResolvedValue(null);

    const req = {
      params: { productId: '999' }
    };

    const res = {
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await productController.deleteProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Producto no encontrado");
  });

  it('debería devolver 500 si ocurre un error', async () => {

    ProductModel.findByIdAndDelete
      .mockRejectedValue(new Error('DB error'));

    const req = {
      params: { productId: '123' }
    };

    const res = {
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await productController.deleteProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send)
      .toHaveBeenCalledWith("Error while deleting product");
  });

});




