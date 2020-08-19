from rest_framework import serializers
from rest_framework_jwt.settings import api_settings    # added this
from .models import *


class SocialSerializer(serializers.Serializer):
    """
    Serializer which accepts an OAuth2 access token and provider.
    """
    provider = serializers.CharField(max_length=255, required=True)
    access_token = serializers.CharField(max_length=4096, required=True, trim_whitespace=True)


class UserSerializer(serializers.ModelSerializer): #added this for login

    class Meta:
        model = User
        fields = ('id', 'username', 'fullname', 'email', 'is_student', 'is_trainer')


class UserSerializerWithToken(serializers.ModelSerializer): # added this for signup

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):        #added this beacuse User class doesnt have get_token by deafult
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'id', 'username', 'password', 'fullname', 'email', 'is_student', 'is_trainer')


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = '__all__'

class AssignmentSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

class FeedBackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
                