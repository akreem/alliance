from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer, LoginSerializer

class UserViewSet(viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'id': user.id,
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            
            if user:
                return Response({
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'token': 'sample-jwt-token'  # In a real app, generate a JWT token
                })
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
