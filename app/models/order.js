// 'use strict';
//
// var orders = global.nss.db.collection('orders');
// var dishes = global.nss.db.collection('dishes');
// var Mongo = require('mongodb');
// var async = require('async');
// var _ = require('lodash');
//
// class Order {
//     static create(userId, order, fn) {
//         var o = new Order();
//         o.userId = Mongo.ObjectID(userId);
//         o.date = new Date();
//
//         var quantities = _([order.qty]).flatten().map(n=>n*1).value();
//         var dishIds = _([order.dishId]).flatten().map(i=>Mongo.ObjectID(i)).value();
//         var meal = quantities.map((v,i)=>new Object({qty:quantities[i], dishId:dishIds[i]}));
//
//         async.map(meal, (m,fn)=>dishes.findOne({_id:m.dishId}, (e,dish)=>fn(null, {qty:m.qty, dish:dish})), (e,fullmeal)=>{
//             o.totalcost = fullmeal.map(m=>m.qty * m.dish.cost).reduce((p,c)=>p+c);
//             o.totalCals = fullmeal.map(m=>m.qty * m.dish.calories).reduce((p,c)=>p+c);
//             o.meal = meal;
//
//             orders.save(o, ()=>fn());
//         });
//     }
//
//     static findAllByUserId(userId, fn) {
//         userId = Mongo.ObjectID(userId);
//     }
// }
