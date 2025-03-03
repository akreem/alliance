from django.db import models
from django.utils.text import slugify

class Property(models.Model):
    PROPERTY_TYPES = [
        ('Villa', 'Villa'),
        ('Apartment', 'Apartment'),
        ('House', 'House'),
        ('Condo', 'Condo'),
        ('Estate', 'Estate'),
    ]
    
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    price = models.CharField(max_length=50)
    price_value = models.IntegerField()
    location = models.CharField(max_length=255)
    beds = models.IntegerField()
    baths = models.IntegerField()
    sqft = models.IntegerField()
    type = models.CharField(max_length=50, choices=PROPERTY_TYPES)
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
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class PropertyFeature(models.Model):
    property = models.ForeignKey(Property, related_name='features', on_delete=models.CASCADE)
    feature = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.property.title} - {self.feature}"

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, related_name='images', on_delete=models.CASCADE)
    image_url = models.CharField(max_length=255)
    is_primary = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.property.title} - {'Primary' if self.is_primary else 'Secondary'}"

class Agent(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    image_url = models.CharField(max_length=255, blank=True, null=True)
    properties = models.ManyToManyField(Property, related_name='agents', blank=True)
    
    def __str__(self):
        return self.name
