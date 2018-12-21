(function(){

  // when I click on the add to cart button
  $('.add_to_cart').on('click', function(e){
    var variantId = 1192091516938;
    
    jQuery.getJSON('/cart.js', function(data){
     var items = data.items;
     console.log(items);
     var currentVarId;
     var quantity;
     var isProduct = false;
     items.forEach(function(e,i,a){
       console.log(e);
       currentVarId = e.variant_id;
       
       if(currentVarId === variantId) {
         isProduct = true;
         quantity = e.quantity;
       }
     });
     
      if(!isProduct) {
        jQuery.post('/cart/add.js', {
          quantity: 1,
          id: variantId
        });
      } else {
        if(quantity > 1) {
          jQuery.post('/cart/change.js', {
            quantity: 1,
            id: variantId
      });
     }
    }
   });
  });
})();