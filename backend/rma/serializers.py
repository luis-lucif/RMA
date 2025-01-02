from rest_framework import serializers
from .models import Cliente, Producto, Reparacion

class ClienteSerializer(serializers.ModelSerializer):
    factura_url = serializers.SerializerMethodField()
    foto_producto_url = serializers.SerializerMethodField()

    class Meta:
        model = Cliente
        fields = '__all__'  # Incluye todos los campos del modelo
        

    def get_factura_url(self, obj):
        if obj.factura:
            return obj.factura.url
        return None

    def get_foto_producto_url(self, obj):
        if obj.foto_producto:
            return obj.foto_producto.url
        return None

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class ReparacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reparacion
        fields = '__all__'