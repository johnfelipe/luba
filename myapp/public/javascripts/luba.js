/**
 * Created by APA on 2014.05.01..
 */

var bids = {};
var bidsPerNumber = {};
var users = {};

exports.makeBid = function (number, login) {
    var user = users[login];
    if (user == null) {
        return {code: 'USER_NOT_FOUND', success: false};
    }
    if (user.credits <= 0) {
        return {code: 'INSUFFICIENT_BALANCE', success: false};
    }
    user.credits = user.credits - 1; // decrease user balance

    var key = 'B#' + login + '#' + number;

    if (bids[key] != null) {
        return {code: 'BID_ALREADY_EXISTS', success: false};
    }
    bids[key] = {number: number, login: login, date: new Date()}

    // maintain bids per number map
    var isBidUnique = false;
    var bpn = bidsPerNumber[number]; // get the current entry for a given number
    if (bpn == null) {
        // first bid for this number
        bidsPerNumber[number] = 1;
        isBidUnique = true;
    } else {
        bidsPerNumber[number] = bidsPerNumber[number] + 1;
    }
    return {code: 'OK', success: true, unique: isBidUnique, balance: user.credits};
};

exports.getUserBalance = function(login, password){
    var user = users[login];
    if (user == null) {
        return {code: 'USER_NOT_FOUND', success: false};
    }

    if (user.pw != password) {
        return {code: 'WRONG_PASSWORD_YO', success: false};
    }

    return user.credits;
}

exports.getAllBids = function () {
    return bids;
}

exports.createUser = function (login, password) {
    var user = users[login];
    if (user != null) {
        return {code: 'USER_ALREADY_EXISTS', success: false};
    }
    else {
        users[login] = {
            login: login,
            pw: password,
            credits: 100
        }
        return {code: 'OK', success: true};
    }
}

exports.getBids = function (login, password) {
    var user = users[login];
    if (user == null) {
        return {code: 'USER_NOT_FOUND', success: false};
    }

    if (user.pw != password) {
        return {code: 'WRONG_PASSWORD_YO', success: false};
    }

    var bidsCopy = JSON.parse(JSON.stringify(bids)); // create a deep copy of bids structure

    for (var key in bidsCopy) {
        var bid = bidsCopy[key];

        if (bid.login != login) {
            delete bidsCopy[key]; // we delete everything not belonging to current user
        } else {
            if (bidsPerNumber[bid.number] > 1) {
                bid.isUnique = false;
            } else {
                bid.isUnique = true;
            }
        }
        console.log(bid);
    }
    return bidsCopy;
}
