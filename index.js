#! /usr/bin/env node

var http = require('http');
var Promise = require('bluebird');
var bl = require('bl');

function getResults (url) {

    return new Promise(function (resolve, reject) {
        http.get(url, function (res) {
            res.pipe(bl(function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            }));
        });
    });
}

var promises = [];
process.argv.forEach(function (item, i) {
    if (i > 1) {
        promises.push(getResults(item));
    }
});

Promise.all(promises)
    .then(function(res) {
        res.forEach(function (item, i) {
            console.log('item.length', item.length);
            // console.log('item', item);
        });
    })
    .catch(function (err) {
        console.log('Something went wrong with one of your requests', err);
    });
