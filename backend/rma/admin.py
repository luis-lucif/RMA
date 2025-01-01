from django.contrib import admin
from .models import Cliente, Producto # Importa el modelo Cliente
# Register your models here.


admin.site.register(Cliente)  # Registra el modelo en el panel de administración
admin.site.register(Producto)  # Registra el modelo Producto