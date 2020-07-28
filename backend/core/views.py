
# todo/views.py

from django.http import HttpResponseRedirect
from django.shortcuts import render
from rest_framework import viewsets, permissions, status          # add this
from .serializers import UserSerializer, UserSerializerWithToken      # add this
from .models import User
from .permissions import UserPermission
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication  # added this
from rest_framework.permissions import IsAuthenticated  # added this
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


class UserView(viewsets.ModelViewSet):       # add this
    # authentication_classes=[TokenAuthentication] #added this
    # permission_classes= [IsAuthenticated] #added this
    permission_classes = (UserPermission,)
    serializer_class = UserSerializerWithToken          # add this
    queryset = User.objects.all()               # add this


@api_view(['GET'])
def current_user(request):  # Determine the current user by their token, and return their data

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


# Create a new user.A get method for retrieving a list of all User objects.
class UserList(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
