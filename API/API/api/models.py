from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class Note(models.Model):
    badge = models.ForeignKey(User, on_delete=models.CASCADE, related_name="note" , null=True)

    title = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    note_image = models.ImageField(null=True,blank=True,upload_to=upload_to)
   

    def __str__(self):
        return self.title
