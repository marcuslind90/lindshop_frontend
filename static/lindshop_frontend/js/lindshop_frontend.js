$('form#add-product').on('submit', function(e){
	e.preventDefault();

	// Gather data from the page.
	var id_product = $('input[name="id_product"]').val();
	var quantity = 1;
	var attributes = [];

	$('.product-attributes select').each(function(index, element){
		var temp_arr = {};
		temp_arr['attribute'] = $(this).attr('name');
		temp_arr['value'] = $(this).val();
		attributes[index] = JSON.stringify(temp_arr);
	});

	// Add the item to the cart.
	Lindshop.addItem({id_product: id_product, quantity: quantity, attributes: attributes}, function(response) {

		// When we've successfully added the item to the cart, lets fetch 
		// an updated HTML for the Cart Dropdown.
		Lindshop.getCartHtml(1, function(response) {
			$('.cart-dropdown ul .cart-content').html(response.html);

			if(response.product_count > 0){
				$('.dropdown-toggle .badge').text(response.product_count).show();
			}
			else {
				$('.dropdown-toggle .badge').text("0").hide()
			}
		});

	});
});