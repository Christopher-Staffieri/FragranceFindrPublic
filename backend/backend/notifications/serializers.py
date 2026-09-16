
from rest_framework import serializers


from backend.research.serializers import PerfumeSerializer, EditedBySerializer, EditedByProfileSerializer
from backend.accounts.models import UserProfile, User
from backend.database.models import Perfume
from backend.database.serializers import ReviewSerializer, PerfumeSerializer
# from database.serializers import ReviewSerializer
from backend.notifications.models import LikeReviewNotification, NewPerfumeReviewNotification, NotificationActor, Notification
from backend.profiles.serializers import UserProfileSerializer



class NotificationActorSerializer(serializers.ModelSerializer):
    actor = UserProfileSerializer()
    class Meta:
        model = NotificationActor
        fields = ['actor', 'timestamp']

class NotificationSerializer(serializers.ModelSerializer):
    actors = NotificationActorSerializer(source='notificationactor_set', many=True, read_only=True)
    # actors_display = serializers.SerializerMethodField()
    # target = ReviewSerializer(read_only=True)
    class Meta:
        model = Notification
        fields = '__all__'
        
        # 'id', 'recipient', 'actors', 'type', 'message', 'target',
        #     'related_id', 'unread', 'time_created'
        


class UserNotificationSerializer(serializers.ModelSerializer):
    recipient = UserProfileSerializer(read_only=True)
    actors = UserProfileSerializer(read_only=True, many=True)
    target_post = ReviewSerializer(read_only=True)
    actors_display = serializers.SerializerMethodField()
    class Meta:
        model = LikeReviewNotification
        fields = '__all__'
        
    def get_actors_display(self, obj):
        return obj.get_actors_display()
    
class NewPerfumeReviewNotificationSerializer(serializers.ModelSerializer):
    actors_display = serializers.SerializerMethodField()
    target_perfume_name = serializers.CharField(source='target_perfume.perfume', read_only=True)
    recipient = UserProfileSerializer(read_only=True)
    actors = UserProfileSerializer(read_only=True, many=True)
    target_perfume = PerfumeSerializer(read_only=True)
    class Meta:
        model = NewPerfumeReviewNotification
        fields = '__all__'
    
    def get_actors_display(self, obj):
        return obj.get_actors_display()