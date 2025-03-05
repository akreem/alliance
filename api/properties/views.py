from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Property
from .serializers import PropertyListSerializer, PropertyDetailSerializer, PropertyCreateSerializer

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
