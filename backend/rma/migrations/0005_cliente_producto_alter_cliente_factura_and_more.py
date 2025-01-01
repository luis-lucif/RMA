# Generated by Django 5.1.4 on 2025-01-01 21:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rma', '0004_rename_archivo_cliente_factura_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='producto',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='rma.producto'),
        ),
        migrations.AlterField(
            model_name='cliente',
            name='factura',
            field=models.FileField(blank=True, null=True, upload_to='facturas/'),
        ),
        migrations.AlterField(
            model_name='cliente',
            name='foto_producto',
            field=models.ImageField(blank=True, null=True, upload_to='fotos_productos/'),
        ),
    ]