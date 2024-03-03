# serializers.py
from rest_framework import serializers

from .models import Track


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ['id', 'track_points', 'track_name', 'user']

    def create(self, validated_data):
        # Override the create method to handle the user field separately
        user = validated_data.pop('user')
        track = Track.objects.create(user=user, **validated_data)
        return track
