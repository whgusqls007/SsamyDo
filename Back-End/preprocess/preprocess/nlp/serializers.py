from dataclasses import field
from rest_framework import serializers
from .models import Notice

class NoticeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notice
        fields = "file_ids", "title", "description", "channel_id", "date"