from django.db import models
from django.conf import settings
from django.contrib.auth.models import User




class Note(models.Model):
    badge = models.ForeignKey(User, on_delete=models.CASCADE, related_name="note" , null=True)

    title = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
