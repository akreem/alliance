# Generated by Django 4.2.7 on 2025-03-06 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='type',
            field=models.CharField(choices=[('Villa', 'Villa'), ('Apartment', 'Apartment'), ('House', 'House'), ('Condo', 'Condo'), ('Estate', 'Estate'), ('Land', 'Land')], max_length=50),
        ),
    ]
