from django.db.models import Q
from rest_framework import viewsets
from rest_framework.response import Response
import rest_framework
from .models import Cliente, Producto, Reparacion
from .serializers import ClienteSerializer, ProductoSerializer, ReparacionSerializer


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
        estado_reparacion = request.GET.get('estado_reparacion')

        condiciones = []

        if nombre:
            condiciones.append(Q(nombre_completo__icontains=nombre))
        if telefono:
            condiciones.append(Q(telefono__icontains=telefono))
        if producto:
            condiciones.append(Q(producto_id=producto))
        if fecha_ingreso:
            condiciones.append(Q(fecha_ingreso__date=fecha_ingreso))

        # Combina las condiciones con AND
        if condiciones:
            q_filter = Q()
            for condicion in condiciones:
                q_filter &= condicion
            queryset = queryset.filter(q_filter)

        if estado_reparacion:
            queryset = queryset.filter(reparacion__estado=estado_reparacion)

        queryset = queryset.distinct()

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        cliente = self.get_object()
        serializer = ClienteSerializer(cliente)

        # Obtener la reparación del cliente
        try:
            reparacion = Reparacion.objects.get(cliente=cliente)
        except Reparacion.DoesNotExist:
            reparacion = None

        # Incluir la información de la reparación en la respuesta, 
        # incluyendo campos adicionales si es necesario
        serializer.data['reparacion'] = {
            'id': reparacion.id if reparacion else None,
            'estado': reparacion.estado if reparacion else None,
            # ... otros campos de la reparación ... 
        }

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