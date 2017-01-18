from django.shortcuts import render
import lindshop

# Create your views here.
class HomeView(lindshop.views.HomeView):
	template_name = "lindshop_frontend/index.html"

class CategoryList(lindshop.views.CategoryList):
	template_name = "lindshop_frontend/category/category-detail.html"

class ProductDetail(lindshop.views.ProductDetail):
	template_name = "lindshop_frontend/product/product-detail.html"

class Summary(lindshop.views.CartSummary):
	template_name = "lindshop_frontend/checkout/summary.html"

class Checkout(lindshop.views.Checkout):
	template_name = "lindshop_frontend/checkout/checkout.html"

class ThankYou(lindshop.views.ThankYou):
	template_name = "lindshop_frontend/checkout/thankyou.html"