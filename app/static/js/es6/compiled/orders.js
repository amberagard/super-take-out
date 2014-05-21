(function() {
  'use strict';
  $(document).ready(initialize);
  function initialize() {
    $('.menu').change(getMenu);
    $('#add').click(add);
  }
  function getMenu() {
    var menu = $(this).val();
    var next = $(this).next();
    ajax(("/dishes/" + menu), 'get', null, (function(h) {
      next.empty().append(h);
    }));
  }
  function add(e) {
    var quantity = $('#input').val();
    var menu = $('.menu').val();
    var dish = $('.dish').val();
    console.log(quantity);
    console.log(menu);
    console.log(dish);
    e.preventDefault();
  }
})();

//# sourceMappingURL=orders.map
