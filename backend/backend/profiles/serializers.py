from rest_framework import serializers
from ..accounts.models import UserProfile, User
from django.core.files.base import ContentFile
from .models import ProfileBadge
# from backend.database.models import ParentCompany

import uuid
import base64

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'id'] 
        
class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        # Decode the file
        format, imgstr = data.split(';base64,')
        ext = format.split('/')[-1]
        id = uuid.uuid4().hex
        data = ContentFile(base64.b64decode(imgstr), name=f"{id}.{ext}")
        return super().to_internal_value(data)
    
class BadgeSerializer(serializers.ModelSerializer):
    class meta:
        model = ProfileBadge
    


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    profile_picture = Base64ImageField(max_length=None)
    class Meta:
        model = UserProfile
        fields="__all__"
        

        
