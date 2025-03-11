# Generated by Django 4.2.7 on 2025-03-10 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0003_propertyimage_image_alter_propertyimage_image_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='property',
            name='price',
        ),
        migrations.RemoveField(
            model_name='property',
            name='type',
        ),
        migrations.AddField(
            model_name='property',
            name='dimensions',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='property',
            name='property_type',
            field=models.CharField(choices=[('Terrain', 'Terrain'), ('Villa', 'Villa'), ('Maison', 'Maison'), ('Appartement', 'Appartement'), ('Résidence', 'Résidence')], default=0, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='property',
            name='surface',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='property',
            name='baths',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='property',
            name='beds',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='property',
            name='location',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='property',
            name='sqft',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
