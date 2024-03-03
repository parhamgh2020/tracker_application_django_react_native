# Import the necessary modules.
from django.urls import path
from .views import UserCreateView, UserListView

# Create a URL pattern for the User view.
urlpatterns = [
    path('user/create', UserCreateView.as_view()),
    path('user/list', UserListView.as_view()),
]
