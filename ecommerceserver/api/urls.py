from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import usersViewSet,SingleUserByEmail,menuViewSet


router = DefaultRouter()
router.register(r'users',usersViewSet),
router.register(r'menu',menuViewSet),





urlpatterns = [
    path('', include(router.urls)),
    path('user/', SingleUserByEmail.as_view()), 
    
   
]