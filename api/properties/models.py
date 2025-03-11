from django.db import models
from django.utils.text import slugify
import os
import uuid

def get_image_path(instance, filename):
    """Generate a unique path for uploaded property images"""
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('properties', str(instance.property.id), filename)

class Property(models.Model):
    PROPERTY_TYPES = [
        ('Terrain', 'Terrain'),
        ('Appartement', 'Appartement'), 
        ('Villa', 'Villa'),
        ('Maison', 'Maison'),
        ('Résidence', 'Résidence'),         
    ]
    
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    price_value = models.IntegerField()
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    rooms = models.IntegerField(blank=True, null=True)
    baths = models.IntegerField(blank=True, null=True)
    surface = models.FloatField(blank=True, null=True)
    dimensions = models.CharField(max_length=255, blank=True, null=True)
    sqft = models.IntegerField(blank=True, null=True)
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPES)
    description = models.TextField(blank=True, null=True)
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    is_favorite = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = 'Properties'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

    def clean(self):
        # Validation based on property type
        if self.property_type == 'Terrain':
            if not self.surface :
                raise ValidationError('Surface is required for Terrain properties.')
            if self.rooms or self.baths:
                raise ValidationError('rooms and baths should not be set for Terrain properties.')
        else:
            if self.property_type in ['Appartement', 'Villa', 'Maison'] and (not self.rooms or not self.baths):
                raise ValidationError('rooms and baths are required for house or apartment properties.')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        self.full_clean()  # Ensure validation runs on save
        super().save(*args, **kwargs)

class PropertyFeature(models.Model):
    property = models.ForeignKey(Property, related_name='features', on_delete=models.CASCADE)
    feature = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.property.title} - {self.feature}"

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=get_image_path)
    image_url = models.CharField(max_length=255, blank=True, null=True)
    is_primary = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.property.title} - {'Primary' if self.is_primary else 'Secondary'}"
    
    def save(self, *args, **kwargs):
        if self.image and not self.image_url:
            self.image_url = self.image.url
        super().save(*args, **kwargs)

class Agent(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    image_url = models.CharField(max_length=255, blank=True, null=True)
    properties = models.ManyToManyField(Property, related_name='agents', blank=True)
    
    def __str__(self):
        return self.name
