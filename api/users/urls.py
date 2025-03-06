from django.urls import path
from . import views
from . import auth

urlpatterns = [
    path('auth/register/', auth.register_user, name='register'),
    path('auth/login/', auth.login_user, name='login'),
]