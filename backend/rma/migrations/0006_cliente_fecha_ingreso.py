# Generated by Django 5.1.4 on 2025-01-02 00:07

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rma', '0005_cliente_producto_alter_cliente_factura_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='fecha_ingreso',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
