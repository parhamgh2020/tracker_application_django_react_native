# views.py
from django.forms import model_to_dict
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Track
from .serializers import TrackSerializer


class UserTrackListViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        username = request.user.username
        data = Track.objects.filter(user__username=username)
        data = [model_to_dict(obj) for obj in data]
        serializer = TrackSerializer(data=data, many=True)
        if serializer.is_valid(raise_exception=True):
            data = serializer.initial_data
            return Response(data)

    def post(self, request, format=None):
        data = request.data
        data['user'] = request.user.id
        serializer = TrackSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
