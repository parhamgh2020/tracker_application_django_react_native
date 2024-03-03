from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Track(models.Model):
    track_points = models.JSONField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    track_name = models.CharField(max_length=50)
