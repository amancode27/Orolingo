
# todo/views.py

from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import TodoSerializer      # add this
from .models import Todo
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication #added this
from rest_framework.permissions import IsAuthenticated #added this                   
        
class TodoView(viewsets.ModelViewSet):       # add this
  authentication_classes=[SessionAuthentication, BasicAuthentication] #added this
  permission_classes= [IsAuthenticated] #added this
  
  serializer_class = TodoSerializer          # add this
  queryset = Todo.objects.all()              # add this