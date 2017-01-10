from django.conf.urls import include, url
import lindshop_frontend.views as views
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