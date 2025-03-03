from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, ContactViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', ContactViewSet.as_view({'post': 'create'})),
]
