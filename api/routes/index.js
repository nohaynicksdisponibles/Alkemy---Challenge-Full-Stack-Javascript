const router = require('express').Router()

const operationsRouter = require("./operations");
const usersRouter = require("./users");

router.use("/", usersRouter); 
router.use("/operation", operationsRouter);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
