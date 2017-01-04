from django.conf.urls import include, url
import lindshop_frontend.views as views
from lindshop.core.product.views import product
from lindshop.core.category.views import category
from lindshop.core.cart.views import ajax_cart
from lindshop.core.checkout.views import checkout, ajax_checkout, process_checkout, thank_you
from lindshop.core.payment.views import payment_webhook, get_form
from lindshop.core.dashboard.api import UserViewSet, OrderViewSet, CartViewSet, ProductViewSet, CategoryViewSet, PricingViewSet, TaxruleViewSet, CurrencyViewSet, ProductImageViewSet, AttributeViewSet, StockViewSet, WarehouseViewSet, MenuViewSet, SlideshowViewSet, ProductDataPresetViewSet, CountryViewSet, CarrierViewSet
import lindshop.core.api.viewsets as viewsets
from rest_framework import routers

app_name = 'lindshop_frontend'

urlpatterns = [
	url(r'^$', views.HomeView.as_view(), name='index'), 
	url(r'^summary/$', views.CartSummary.as_view(), name='summary'), 
	url(r'^checkout/$', views.Checkout.as_view(), name="checkout"), 
	url(r'^thank-you/$', views.ThankYou.as_view(), name="thank_you"), 
	url(r'^(?P<id_product>[0-9]+)-(?P<slug>[a-z\-0-9]+)/$', views.ProductDetail.as_view(), name="product"), 
	url(r'^(?P<category_slug>[a-z0-9-]+)/$', views.CategoryList.as_view(), name="category"), 
]