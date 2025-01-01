from django.urls import path
from rest_framework import routers
from .views import ClienteViewSet, ProductoViewSet, ReparacionViewSet  # Importa las ViewSets

router = routers.DefaultRouter()
router.register(r'clientes', ClienteViewSet)  # Registra la ViewSet para clientes
router.register(r'productos', ProductoViewSet)  # Registra la ViewSet para productos
router.register(r'reparaciones', ReparacionViewSet)  # Registra la ViewSet para reparaciones

urlpatterns = router.urls