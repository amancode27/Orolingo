
# todo/views.py

from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import viewsets, permissions, status          # add this
from .serializers import TodoSerializer , UserSerializer,UserSerializerWithToken      # add this
from .models import Todo
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication #added this
from rest_framework.permissions import IsAuthenticated #added this                   
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
        
class TodoView(viewsets.ModelViewSet):       # add this
  authentication_classes=[SessionAuthentication, BasicAuthentication] #added this
  permission_classes= [IsAuthenticated] #added this

  serializer_class = TodoSerializer          # add this
  queryset = Todo.objects.all()               # add this

@api_view(['GET'])
def current_user(request): #    Determine the current user by their token, and return their data

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):    # Create a new user.A get method for retrieving a list of all User objects.

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  