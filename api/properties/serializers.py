from rest_framework import serializers
from .models import Property, PropertyFeature, PropertyImage, Agent

class PropertyFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyFeature
        fields = ['feature']

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'image_url', 'is_primary']

class PropertyImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['image', 'is_primary']
        
    def create(self, validated_data):
        property_id = self.context.get('property_id')
        if not property_id:
            raise serializers.ValidationError("Property ID is required")
        
        try:
            property_obj = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            raise serializers.ValidationError("Property not found")
        
        # If this is a primary image, set all other images to non-primary
        if validated_data.get('is_primary', False):
            PropertyImage.objects.filter(property=property_obj, is_primary=True).update(is_primary=False)
        
        # Create the new image
        return PropertyImage.objects.create(property=property_obj, **validated_data)

class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = ['name', 'phone', 'email', 'image_url']


class PropertyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'  # Or specify fields manually if needed


class PropertyListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Property
        fields = ['id', 'title', 'price', 'price_value', 'location', 'beds', 'baths', 'sqft', 'type', 'is_favorite', 'image']
    
    def get_image(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()
        if primary_image:
            return primary_image.image_url
        return None
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['price_value'] = instance.price_value
        representation['is_favorite'] = instance.is_favorite
        return representation

class PropertyDetailSerializer(serializers.ModelSerializer):
    features = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    agent = serializers.SerializerMethodField()
    
    class Meta:
        model = Property
        fields = ['id', 'title', 'price', 'location', 'beds', 'baths', 'sqft', 'type', 'description', 'lat', 'lng', 'is_favorite', 'features', 'images', 'agent']
    
    def get_features(self, obj):
        features = obj.features.all()
        return [feature.feature for feature in features]
    
    def get_images(self, obj):
        images = obj.images.all().order_by('-is_primary')
        return [image.image_url for image in images]
    
    def get_agent(self, obj):
        agent = obj.agents.first()
        if agent:
            return {
                'name': agent.name,
                'phone': agent.phone,
                'email': agent.email,
                'image': agent.image_url
            }
        return None
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['is_favorite'] = instance.is_favorite
        return representation
