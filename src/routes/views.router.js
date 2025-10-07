import { Router } from 'express';
import productModel from '../models/product.model.js';
import cartModel from '../models/cart.model.js';

const router = Router();

// Listado de productos con paginación
router.get('/products', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const result = await productModel.paginate({}, {
    limit: parseInt(limit),
    page: parseInt(page),
    lean: true
    });

    res.render('products', {
    title: 'Productos',
    products: result.docs,
    page: result.page,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage
    });
});

// Vista de carrito
router.get('/carts/:cid', async (req, res) => {
    const cart = await cartModel.findById(req.params.cid)
    .populate('products.product')
    .lean();

    res.render('cart', {
    title: 'Mi Carrito',
    products: cart.products || [],
    cartId: req.params.cid
    });
});

// Vista de detalle de producto
router.get('/products/:pid', async (req, res) => {
    try {
    const product = await productModel.findById(req.params.pid).lean();
    if (!product) {
        return res.status(404).send('Producto no encontrado');
    }
    res.render('productDetail', { product });
    } catch (error) {
    res.status(500).send('Error al buscar el producto');
    }
});

export default router;