/* global ajax */
/* jshint unused:false */

(function() {
    'use strict';

    $(document).ready(initialize);

    function initialize() {
        $('form#order').on('change', '.menu', getMenu);
        $('#add').click(add);
        $('form#order').on('click', '#remove', remove);
        $('form#order').on('change', 'input', formChanged);
        $('form#order').on('blur', 'input', formChanged);
        $('form#order').on('change', '.dish', formChanged);
        $('.order').click(order);
    }

    function order() {
        var orderItems = $('.menu-item').toArray().map(function(item) {
            var $item = $(item);
            var qty = $item.find('input').val() * 1;
            var menuItem = $item.find('.dish option:selected').val();
            return {qty:qty, item:menuItem};

        });
        ajax('/orders/', 'post', {orderItems:orderItems}, h=>{
            alert('hi');
            window.location = '/orders';
        });

        return false;
    }

    var total = 0;

    function formChanged() {
        var item = $(this).parent();
        updateCost(item);
    }

    function updateCost(item) {
        updateSubTotal(item);
        updateTotal();
    }

    function updateSubTotal(item) {
        var subtotal = 0;
        var qty = item.find('input').val() * 1;
        var cost = item.find('.dish option:selected').attr('data-cost') * 1;
        if(qty > 0 && !isNaN(cost)) {
            subtotal = (qty * cost);
        }

        item.data('subtotal', subtotal);
    }

    function updateTotal() {
        var subtotals = $('.menu-item').map((i,d)=>$(d).data('subtotal')).toArray();
        var total = 0;

        if(subtotals.length) {
            total = subtotals.reduce((p,c)=>p+c);
        }

        $('#total').text('$' + total.toFixed(2));
    }

    function getMenu() {
        var menu = $(this).val();
        var next = $(this).next();
        ajax(`/dishes/${menu}`, 'get', null, h=>{
            next.empty().append(h);
            updateCost(next.parent());
        });
    }

    function add() {
        var item = $('form#order > .menu-item:last-child');
        $('form#order').append(item.clone());
    }

    function remove(e) {
        if($('form#order > .menu-item').length > 1) {
            $(this).parent().remove();
            updateTotal();
        }
        e.preventDefault();
    }

})();
