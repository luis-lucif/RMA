from django.db import models

class Cliente(models.Model):
    nombre_completo = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    correo_electronico = models.EmailField(blank=True)
    factura = models.FileField(upload_to='facturas/', blank=True, null=True)  # Guarda directamente en 'facturas/'
    foto_producto = models.ImageField(upload_to='fotos_productos/', blank=True, null=True)  # Guarda directamente en 'fotos_productos/'
    observaciones = models.TextField(blank=True)
    producto = models.ForeignKey('Producto', on_delete=models.SET_NULL, null=True, blank=True)  # Relación con el modelo Producto

    
    def __str__(self):
        return self.nombre_completo

class Producto(models.Model):
    modelo = models.CharField(max_length=255)
    descripcion_problema = models.TextField()

    def __str__(self):
        return self.modelo

class Reparacion(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    costo_reparacion = models.DecimalField(max_digits=10, decimal_places=2)
    ESTADO_CHOICES = (
        ('en_revision', 'En revisión'),
        ('reparado', 'Reparado'),
        ('entregado', 'Entregado'),
    )
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='en_revision')

    def __str__(self):
        return f"Reparación de {self.producto.modelo} para {self.cliente.nombre_completo}"