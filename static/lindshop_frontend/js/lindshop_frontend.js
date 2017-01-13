var cart = $('.cart-dropdown ul .cart-content');
var cart_summary = $('.cart-summary-content');

$('form#add-product').on('submit', function(e){
	e.preventDefault();

	// Gather data from the page.
	var id_product = $('input[name="id_product"]').val();
	var quantity = 1;
	var attributes = [];

	// For each attribute there is in the Add Product form, combine
	// them to a list.
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
		updateCart();

	});
});

// Handles the add voucher button in the Checkout. Whenever the Add Voucher button 
// is clicked, it sends the value to the backend and it validates that the voucher is
// valid, and then adds it to the cart. Also updates the Cart Summary on the Checkout
// with updated price and information.
$('.voucher-box .voucher-field button[name="add"]').click(function(e){
	e.preventDefault();
	Lindshop.addVoucher(
		$('input[name="voucher"]').val(), 
		// Success callback
		function(response){
			$('.voucher-danger').hide();
			$('input[name="voucher"]').val("");

			updateCart();
		}, 
		// Error callback
		function(response) {
			$('.voucher-danger').text(JSON.parse(response.responseText)).show();
		}
	);
});

// Handles any updates to the amount input inside the cart. Whenever the
// value is changed, we update the item quantity on the server and refresh the cart, 
// which will also update the price with the new amount taken into account.
// The reason we use `delegate` is because the input will be reloaded into the DOM
// every time we update the cart.
cart.delegate('input[name="amount"]', 'change', function(e){changeAmount(this, e);});
cart_summary.delegate('input[name="amount"]', 'change', function(e){changeAmount(this, e);});
var changeAmount = function(selector, e) {
	e.preventDefault();
	var container = $(selector).parents('.dropdown-product');

	Lindshop.updateItemQuantity({id_item: container.data('id'), amount: $(selector).val()}, function(response) {
		updateCart();
		// If cart_summary exist on this page, update it as well.
		if(cart_summary.length > 0) {
			updateCartSummary();
		}
	});
}

// Handles the trash/remove link in the cart for each cart item. Whenever
// the remove link is clicked, we remove the item from the cart on the server and 
// refresh the cart. The reason we use `delegate` is because the remove link will be
// reloaded into the DOM every time we update the cart.
cart.delegate('a[name="remove"]', 'click', function(e){clickRemove(this, e);});
cart_summary.delegate('a[name="remove"]', 'click', function(e){clickRemove(this, e);});
var clickRemove = function(selector, e) {
	e.preventDefault();
	var container = $(selector).parents('.dropdown-product');

	Lindshop.deleteItem(container.data('id'), function(response) {
		updateCart();
		// If cart_summary exist on this page, update it as well.
		if(cart_summary.length > 0) {
			updateCartSummary();
		}
	});
}

// Handle refresh of the cart. Gets the new HTML from the server
// that contains all cart products, update badge with amount of numbers.
// Here you can also do things such as adding Spinners, Loaders or other custom
// events whenever your cart gets refreshed.
var updateCart = function() {
	Lindshop.getCartHtml(1, function(response) {
		cart.html(response.html);

		if(response.product_count > 0){
			$('.dropdown-toggle .badge').text(response.product_count).show();
		}
		else {
			$('.dropdown-toggle .badge').text("0").hide()
		}
	});
}

var updateCartSummary = function() {
	Lindshop.getCartSummaryHtml(1, function(response) {
		cart_summary.html(response.html);
	});
}