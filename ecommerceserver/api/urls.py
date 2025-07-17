from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import usersViewSet,SingleUserByEmail,menuViewSet,cartViewSet
from .views import CreatePaymentIntent, SavePayment, GetPayments



router = DefaultRouter()
router.register(r'users',usersViewSet),
router.register(r'menu',menuViewSet),
router.register(r'cart',cartViewSet),





urlpatterns = [
    path('', include(router.urls)),
    path('user/', SingleUserByEmail.as_view()), 
    path('create-payment-intent/', CreatePaymentIntent.as_view()),
    path('payments/', SavePayment.as_view(),),
    path('payments/<str:email>/', GetPayments.as_view(),),
   
]