# Generated by Django 5.1.4 on 2025-01-01 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rma', '0002_cliente_factura_cliente_foto_producto'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cliente',
            name='factura',
        ),
        migrations.RemoveField(
            model_name='cliente',
            name='foto_producto',
        ),
        migrations.AddField(
            model_name='cliente',
            name='archivo',
            field=models.FileField(blank=True, null=True, upload_to='archivos/'),
        ),
        migrations.AddField(
            model_name='cliente',
            name='observaciones',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='cliente',
            name='tipo_archivo',
            field=models.CharField(blank=True, choices=[('factura', 'Factura'), ('foto_producto', 'Foto de producto')], max_length=20, null=True),
        ),
    ]
