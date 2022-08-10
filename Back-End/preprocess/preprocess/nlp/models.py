from django.db import models

# Create your models here.
class Channel(models.Model):
    channel_id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    team_id = models.CharField(max_length=255)
    class Meta:
        db_table = 'channel'


class Notice(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name='todos')
    title = models.CharField(max_length=255)
    file_ids = models.CharField(max_length=255)
    description = models.CharField(max_length=1023)
    date = models.CharField(max_length=255)
    
    class Meta:
        db_table = 'notice'
    
    def __str__(self):
        return self.title
    

class Todo(models.Model):
    notice = models.ForeignKey(Notice, on_delete=models.CASCADE, related_name='todos')
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=1023)
    status = models.CharField(max_length=255)
    file_ids = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    duedate = models.CharField(max_length=255)

    class Meta:
        db_table = 'todo'
    
    def __str__(self):
        return self.title


