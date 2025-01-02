from django.shortcuts import render
import rest_framework
from rest_framework import viewsets
from .serializers import ClienteSerializer, ProductoSerializer, ReparacionSerializer
from .models import Cliente, Producto, Reparacion
from django.db.models import Q
from rest_framework.response import Response


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    renderer_classes = [rest_framework.renderers.JSONRenderer]  

    def list(self, request):
        queryset = self.get_queryset()
        nombre = request.GET.get('nombre')
        telefono = request.GET.get('telefono')
        producto = request.GET.get('producto')
        fecha_ingreso = request.GET.get('fecha_ingreso')

        q_filter = Q()

        if nombre:
            q_filter &= Q(nombre_completo__icontains=nombre)
            queryset = queryset.filter(q_filter)  # Aplica el filtro solo si se proporciona un nombre
            print(q_filter)
        if telefono:
            q_filter &= Q(telefono__icontains=telefono)
        if producto:
            q_filter &= Q(producto_id=producto)
        if fecha_ingreso:
            q_filter &= Q(fecha_ingreso__date=fecha_ingreso)

        #queryset = queryset.filter(q_filter)  # Esta línea estaba mal indentada

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

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


    