var express = require('express');
var router = express.Router();

const operationsRouter = require("./operations");
const usersRouter = require("./users");
router.use("/", operationsRouter);
router.use("/user", usersRouter); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
