'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');
//var Order = traceur.require(__dirname + '/../models/order.js');

exports.new = (req, res)=>{
    Dish.menu(menus=>{
        User.findByUserId(req.session.userId, user=>{
            res.render('orders/new', {user:user, menus:menus, title: 'Order Food'});
        });
    });
};

exports.create = (req, res)=>{
    User.findByUserId(req.session.userId, user=>{
        User.addOrder(user, req.body, function(){
            res.send('success');
        });

    });
    console.log('user id');
    console.log(req.session.userId);
};
