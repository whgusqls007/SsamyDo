from dataclasses import field
from rest_framework import serializers
from .models import Notice, Todo

class NoticeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notice
        fields = "title", "description", "channel_id", "date", "file_ids"
    
class TodoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Todo
        fields = "title", "description", "notice_id", "file_ids", "date", "duedate" 