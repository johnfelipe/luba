/**
 * Created by APA on 2014.05.01..
 */
var express = require('express');
var router = express.Router();
var luba = require('../public/javascripts/luba');

/* GET users listing. */
router.get('/', function (req, res) {
    var login = req.param('login');
    var password = req.param('password');
    res.send(luba.getBids(login, password));
});

module.exports = router;
