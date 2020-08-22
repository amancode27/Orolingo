
# todo/views.py

from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from rest_framework import generics, views, viewsets, permissions, status          # add this
from .serializers import *      # add this
from .models import *
from .permissions import UserPermission
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication  # added this
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from requests.exceptions import HTTPError
from social_django.utils import load_strategy, load_backend
from social_core.backends.oauth import BaseOAuth2
from social_core.exceptions import MissingBackend, AuthTokenError, AuthForbidden
import json
from django.core import serializers
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

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

class SocialLoginView(generics.GenericAPIView):
    """Log in using facebook"""
    serializer_class = SocialSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        """Authenticate user through the provider and access_token"""
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        provider = serializer.data.get('provider', None)
        strategy = load_strategy(request)
        new_account = True

        try:
            backend = load_backend(strategy=strategy, name=provider, redirect_uri=None)

        except MissingBackend:
            return Response({'error': 'Please provide a valid provider'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            if isinstance(backend, BaseOAuth2):
                access_token = serializer.data.get('access_token')
            user_details = backend.user_data(access_token)
            if User.objects.filter(username=user_details['email']).exists():
                new_account = False
            user = backend.do_auth(access_token)
        except HTTPError as error:
            return Response({
                "error": {
                    "access_token": "Invalid token",
                    "details": str(error)
                }
            }, status=status.HTTP_400_BAD_REQUEST)
        except AuthTokenError as error:
            return Response({
                "error": "Invalid credentials",
                "details": str(error)
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            authenticated_user = backend.do_auth(access_token, user=user)

        except HTTPError as error:
            return Response({
                "error": "invalid token",
                "details": str(error)
            }, status=status.HTTP_400_BAD_REQUEST)

        except AuthForbidden as error:
            return Response({
                "error": "invalid token",
                "details": str(error)
            }, status=status.HTTP_400_BAD_REQUEST)

        if authenticated_user and authenticated_user.is_active:
            # generate JWT token
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
            data = {
                "token": jwt_encode_handler(
                    jwt_payload_handler(user)
                )}
            # customize the response to your needs
            if not (authenticated_user.is_student or authenticated_user.is_trainer):
                new_account = True
            response = {
                "email": authenticated_user.email,
                "username": authenticated_user.username,
                "token": data.get('token'),
                "fullname": authenticated_user.fullname,
                "newAccount": new_account,
                "userId": authenticated_user.id,
                "is_student": authenticated_user.is_student,
                "is_trainer": authenticated_user.is_trainer
            }
            return Response(status=status.HTTP_200_OK, data=response)


# Create a new user.A get method for retrieving a list of all User objects.
class UserList(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentView(viewsets.ModelViewSet):

    permission_classes = (permissions.AllowAny,)
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    # def post(self, request, format=None):
    #     serializer = StudentSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseView(viewsets.ViewSet):

    def list(self, request):
        queryset = Course.objects.all()
        serializer = CourseSerializer(queryset, many = True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Course.objects.all()
        course = get_object_or_404(queryset, pk=pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

class AssignmentView(viewsets.ViewSet):

    def list(self, request):
        queryset = Assignment.objects.all()
        serializer = AssignmentSerilaizer(queryset, many = True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AssignmentSerilaizer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FeedbackView(viewsets.ViewSet):
    def list(self,request):
        queryset = Feedback.objects.all()
        serializer = FeedBackSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = FeedBackSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForumListAPIView(generics.ListAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumListSerializer
    permission_classes = [IsAuthenticated]

class ForumCreateAPIView(generics.CreateAPIView):
    serializer_class = ForumCreateDeleteSerializer
    queryset = Forum.objects.all()
    permission_classes = [IsAuthenticated]

class ForumDetailAPIView(generics.RetrieveAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'

class ForumDeleteAPIView(generics.DestroyAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumCreateDeleteSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'

class ForumUpdateAPIView(generics.UpdateAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumUpdateSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'

class PostListAPIView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    permission_classes = [IsAuthenticated]

class PostCreateAPIView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreateSerializer
    permission_classes = [IsAuthenticated]
    throttle_scope = 'create_post'

class PostDetailAPIView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    permission_classes = [IsAuthenticated]

class PostDeleteAPIView(generics.DestroyAPIView):
    # For now only admin can delete post,
    # because if user keep on deleting post doesn't make sense
    queryset = Post.objects.all()
    serializer_class = PostDeleteSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, format=None):
        try:
            post = Post.objects.get(pk=pk)
            thread = post.thread
            post.delete()

            # since we deleted a post, we now check the latest post
            latest_post = Post.objects.filter(thread=thread).order_by('-created_at').first()

            # update the deleted post's thread last_activity
            if latest_post is None:
                thread.last_activity = thread.created_at
            else:
                thread.last_activity = latest_post.created_at
            thread.save()
            return Response(status=HTTP_200_OK)

        except:
            return Response(status=HTTP_400_BAD_REQUEST)

class PostUpdateAPIView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostUpdateSerializer
    permission_classes = [IsAuthenticated]

class ThreadListAPIView(generics.ListAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadListSerializer
    permission_classes = [IsAuthenticated]

class ThreadCreateAPIView(generics.CreateAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadCreateSerializer
    permission_classes = [IsAuthenticated]
    throttle_scope = 'create_thread'

class ThreadDetailAPIView(generics.RetrieveAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadDetailSerializer
    permission_classes = [IsAuthenticated]

class ThreadDeleteAPIView(generics.DestroyAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadDeleteSerializer
    permission_classes = [IsAuthenticated]

class ThreadUpdateAPIView(generics.UpdateAPIView):
    # For now only admin can force update thread (change name, content, pin)
    queryset = Thread.objects.all()
    serializer_class = ThreadUpdateSerializer
    permission_classes = [IsAuthenticated]
