from django.db import models

# Create your models here.
class Notice(models.Model):
    channel_id = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    file_ids = models.CharField(max_length=255)
    description = models.CharField(max_length=1023)
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
