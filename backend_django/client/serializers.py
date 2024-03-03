from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        validated_data['email'] = validated_data['username']
        return super().create(validated_data)

