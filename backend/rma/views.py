from django.shortcuts import render
import rest_framework
from rest_framework import viewsets
from .serializers import ClienteSerializer, ProductoSerializer, ReparacionSerializer
from .models import Cliente, Producto, Reparacion

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    renderer_classes = [rest_framework.renderers.JSONRenderer]  

    def perform_create(self, serializer):
        cliente = serializer.save()

        if cliente.factura:
            cliente.factura.name = f'facturas/{cliente.factura.name}'
            cliente.save()

        if cliente.foto_producto:
            cliente.foto_producto.name = f'fotos_productos/{cliente.foto_producto.name}'
            cliente.save()

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    renderer_classes = [rest_framework.renderers.JSONRenderer]  

class ReparacionViewSet(viewsets.ModelViewSet):
    queryset = Reparacion.objects.all()
    serializer_class = ReparacionSerializer
    renderer_classes = [rest_framework.renderers.JSONRenderer]
