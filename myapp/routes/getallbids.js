/**
 * Created by APA on 2014.05.01..
 */
var express = require('express');
var router = express.Router();
var luba = require('../public/javascripts/luba');

/* GET users listing. */
router.get('/', function (req, res) {
    res.send(luba.getAllBids());
});

module.exports = router;
