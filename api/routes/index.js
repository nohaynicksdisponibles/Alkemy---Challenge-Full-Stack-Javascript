var express = require('express');
var router = express.Router();


/*

// import all routers;
const productRouter = require("./productsRouter");
const categoryRouter = require('./categoryRouter')
const userRouter = require("./usersRouter");
const orderRouter = require('./orderRouter');
const reviewRouter = require('./reviewsRouter')
const cartRouter = require('./cartRouter');
const mercadopagoRouter = require('./mercadoPagoRouter');

// load each router on a route
// ejemplo
router.use("/products", productRouter); // Ex: http://localhost:3001/products ... para probar ruta
router.use('/categories', categoryRouter) // Ex: http://localhost:3001/categories ... para probar ruta
router.use("/users", userRouter); // Ex: http://localhost:3001/users ... para probar ruta
router.use('/orders', orderRouter); // Ex: http://localhost:3001/orders ... para probar ruta
router.use('/reviews', reviewRouter) // Ex: http://localhost:3001/reviews ... para probar ruta
router.use('/carts', cartRouter) // Ex: http://localhost:3001/carts ... para probar ruta
router.use('/mercadopago', mercadopagoRouter); 


*/


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
