
# todo/serializers.py

from rest_framework import serializers
# from .models import Todo
from rest_framework_jwt.settings import api_settings    #added this
# from django.contrib.auth.models import User             #added this
from .models import User

# class TodoSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = Todo
#     fields = ('id', 'title', 'description', 'completed')


class UserSerializer(serializers.ModelSerializer): #added this for login

    class Meta:
        model = User
        fields = ('username', 'fullname', 'email', 'is_student', 'is_trainer')


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
        fields = ('token', 'username', 'password', 'fullname', 'email', 'is_student', 'is_trainer')
