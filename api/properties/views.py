from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Property, PropertyImage
from .serializers import PropertyListSerializer, PropertyDetailSerializer, PropertyCreateSerializer, PropertyImageSerializer, PropertyImageUploadSerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PropertyDetailSerializer
        elif self.action in ['create', 'update', 'partial_update']:  # Handle creation & updates
            return PropertyCreateSerializer
        return PropertyListSerializer
    
    @action(detail=True, methods=['post'])
    def favorite(self, request, pk=None):
        property = self.get_object()
        property.is_favorite = not property.is_favorite
        property.save()
        return Response({
            'id': property.id,
            'isFavorite': property.is_favorite
        })
    
    @action(detail=True, methods=['post'])
    def update_main_image(self, request, pk=None):
        """
        Update the main (primary) image of a property.
        
        Expected payload:
        {
            "image_url": "https://example.com/image.jpg"
        }
        """
        property = self.get_object()
        image_url = request.data.get('image_url')
        
        if not image_url:
            return Response(
                {"error": "Image URL is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Update or create the primary image
        primary_image, created = PropertyImage.objects.update_or_create(
            property=property,
            is_primary=True,
            defaults={'image_url': image_url}
        )
        
        return Response({
            'id': property.id,
            'image': primary_image.image_url,
            'is_primary': primary_image.is_primary
        }, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def update_images(self, request, pk=None):
        """
        Update all images for a property. This will replace existing images.
        
        Expected payload:
        {
            "images": [
                {"image_url": "https://example.com/image1.jpg", "is_primary": true},
                {"image_url": "https://example.com/image2.jpg", "is_primary": false},
                ...
            ]
        }
        
        Or a simpler format:
        {
            "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg", ...]
        }
        In this case, the first image will be set as primary.
        """
        property = self.get_object()
        images_data = request.data.get('images', [])
        
        if not images_data:
            return Response(
                {"error": "At least one image is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Delete existing images
        property.images.all().delete()
        
        # Handle different input formats
        if isinstance(images_data[0], str):
            # Simple list of URLs
            for i, url in enumerate(images_data):
                PropertyImage.objects.create(
                    property=property,
                    image_url=url,
                    is_primary=(i == 0)  # First image is primary
                )
        else:
            # List of objects with image_url and is_primary
            for image_data in images_data:
                PropertyImage.objects.create(
                    property=property,
                    image_url=image_data.get('image_url'),
                    is_primary=image_data.get('is_primary', False)
                )
        
        # Return updated property with images
        serializer = PropertyDetailSerializer(property)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'], parser_classes=[MultiPartParser, FormParser])
    def upload_image(self, request, pk=None):
        """
        Upload an image file for a property.
        
        This endpoint accepts multipart form data with:
        - image: The image file to upload
        - is_primary: Boolean indicating if this is the primary image (optional, default: false)
        """
        property = self.get_object()
        
        # Check if an image file was provided
        if 'image' not in request.data:
            return Response(
                {"error": "No image file provided"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get is_primary flag
        is_primary = request.data.get('is_primary', '').lower() == 'true'
        
        # If this is a primary image, set all other images to non-primary
        if is_primary:
            PropertyImage.objects.filter(property=property, is_primary=True).update(is_primary=False)
        
        # Create serializer with context
        serializer = PropertyImageUploadSerializer(
            data=request.data,
            context={'property_id': property.id}
        )
        
        if serializer.is_valid():
            image = serializer.save()
            return Response({
                'id': image.id,
                'image_url': image.image_url,
                'is_primary': image.is_primary
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def images(self, request, pk=None):
        """Get all images for a property"""
        property = self.get_object()
        images = property.images.all()
        serializer = PropertyImageSerializer(images, many=True)
        return Response(serializer.data)

class ContactViewSet(viewsets.ViewSet):
    def create(self, request):
        # In a real app, you would save this to the database and/or send an email
        required_fields = ['name', 'email', 'message']
        
        if not all(field in request.data for field in required_fields):
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            'success': True,
            'message': 'Contact form submitted successfully'
        })
