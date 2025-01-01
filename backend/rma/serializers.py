from rest_framework import serializers
from .models import Cliente, Producto, Reparacion

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'  # Incluye todos los campos del modelo

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class ReparacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reparacion
        fields = '__all__'