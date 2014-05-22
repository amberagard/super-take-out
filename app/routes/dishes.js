'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');

exports.menu = (req, res)=>{
    Dish.findByMenu(req.params.menu, dishes=>{
        res.render('dishes/menu', {dishes:dishes});
    });
};

exports.dish = (req, res)=>{
    Dish.findByDishId(req.params.dish, dish=>{
        res.send(dish);
    });
};
