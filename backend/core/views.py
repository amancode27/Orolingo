
# todo/views.py

from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from rest_framework import generics, views, viewsets, permissions, status          # add this
from .serializers import *      # add this
from .models import *
from .permissions import UserPermission
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication  # added this
from rest_framework.permissions import IsAuthenticated, AllowAny
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

from django.conf import settings
import stripe
stripe.api_key = settings.STRIPE_SECRET_KEY


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
    http_method_names = ['get','head','put','patch']
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
    serializer_class = ForumListSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        queryset = Forum.objects.all()
        student_course = self.request.query_params.get('student_course', None)
        if student_course is not None:
            queryset = queryset.filter(student_course=student_course)
        return queryset

class ForumCreateAPIView(generics.CreateAPIView):
    serializer_class = ForumCreateDeleteSerializer
    queryset = Forum.objects.all()
    permission_classes = [AllowAny]

class ForumDetailAPIView(generics.RetrieveAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

class ForumDeleteAPIView(generics.DestroyAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumCreateDeleteSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

class ForumUpdateAPIView(generics.UpdateAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumUpdateSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

class PaymentView(APIView):

    def post(self, request, *args, **kwargs):
        course = Course.objects.get(user=self.request.user)
        userprofile = User.objects.get(user=self.request.user)
        token = request.data.get('stripeToken')

        # if userprofile.stripe_customer_id != '' and userprofile.stripe_customer_id is not None:
        #     customer = stripe.Customer.retrieve(
        #         userprofile.stripe_customer_id)
        #     customer.sources.create(source=token)

        # else:
        #     customer = stripe.Customer.create(
        #         email=self.request.user.email,
        #     )
        #     customer.sources.create(source=token)
        #     userprofile.stripe_customer_id = customer['id']
        #     userprofile.one_click_purchasing = True
        #     userprofile.save()

        amount = 100 #for demo

        try:

                # charge the customer because we cannot charge the token more than once
            charge = stripe.Charge.create(
                amount=amount,  # cents
                currency="usd",
                customer=userprofile.stripe_customer_id
            )
            # charge once off on the token
            # charge = stripe.Charge.create(
            #     amount=amount,  # cents
            #     currency="usd",
            #     source=token
            # )

            # create the payment
            payment = Payment()
            payment.stripe_charge_id = charge['id']
            payment.user = self.request.user
            payment.amount = course.get_total()
            payment.save()

            # assign the payment to the course

            # order_items = course.items.all()
            # order_items.update(ordered=True)
            # for item in order_items:
            #     item.save()

            course.save()

            return Response(status=HTTP_200_OK)

        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            return Response({"message": f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            #messages.warning(self.request, "Rate limit error")
            return Response({"message": "Rate limit error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError as e:
            print(e)
            # Invalid parameters were supplied to Stripe's API
            return Response({"message": "Invalid parameters"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            return Response({"message": "Not authenticated"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            return Response({"message": "Network error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            return Response({"message": "Something went wrong. You were not charged. Please try again."}, status=HTTP_400_BAD_REQUEST)

        except Exception as e:
            # send an email to ourselves
            return Response({"message": "A serious error occurred. We have been notifed."}, status=HTTP_400_BAD_REQUEST)

        return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)

