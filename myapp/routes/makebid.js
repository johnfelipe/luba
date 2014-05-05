/**
 * Created by APA on 2014.05.01..
 */
/**
 * Created by APA on 2014.05.01..
 */
var express = require('express');
var router = express.Router();
var luba = require('../public/javascripts/luba');

/* GET users listing. */
router.get('/', function (req, res) {
    var bid = req.param('bid');
    var user = req.param('user');
    res.send(luba.makeBid(bid, user));

});

module.exports = router;
