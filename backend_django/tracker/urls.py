# urls.py
from django.urls import path

from .views import UserTrackListViewSet

urlpatterns = [
    path('user-track-list/', UserTrackListViewSet.as_view()),
]
