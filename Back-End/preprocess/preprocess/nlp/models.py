from tkinter import CASCADE
from unittest import case
from django.db import models

# Create your models here.
class Notice(models.Model):
    channel_id = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    file_ids = models.CharField(max_length=255)
    description = models.CharField(max_length=1023)
    date = models.CharField(max_length=255)
    
    def __str__(self):
        return self.title
    

class Todo(models.Model):
    notice = models.ForeignKey(Notice, on_delete=CASCADE)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=1023)
    status = models.CharField(max_length=255)
    file_ids = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    duedate = models.CharField(max_length=255)
    
    def __str__(self):
        return self.title