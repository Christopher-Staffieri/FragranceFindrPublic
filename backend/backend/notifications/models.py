from django.db import models
from backend.accounts.models import UserProfile, User
from backend.database.models import Reviews, Perfume
from django.utils.translation import gettext_lazy as _

class Notification(models.Model):
    class NotificationType(models.TextChoices):
        REVIEW = 'review', _('Review')
        REVIEW_LIKE = 'review_like', _('Review Like')
    
    recipient = models.ForeignKey(UserProfile, related_name='notifications', on_delete=models.CASCADE)
    actors = models.ManyToManyField(
        UserProfile, through='NotificationActor', related_name="acted_notifications"
    ) # User who performed the action
    type = models.CharField(max_length=30, choices=NotificationType.choices)
    message = models.CharField(max_length=255)
    target = models.CharField(max_length=255, blank=True, null=True)
    related_id = models.PositiveIntegerField(null=True, blank=True)
    unread = models.BooleanField(default=True)
    time_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Notification to {self.recipient} - {self.verb}"
    
    # def get_actors_display(self):
    #     actors = self.actors.all().order_by('-notifications__createdat')
    #     actor_count = actors.count()
    #     print(actor_count, 'actor count')
    #     if actor_count != 0:
    #         if actor_count == 1:
    #             return f'{actors[0].user.username}'
    #         elif actor_count == 2:
    #             return f'{actors[0].user.username} and {actors[1].user.username}'
    #         else:
    #             return f"{actors[0].user.username} and {actor_count - 1} others"
    class Meta:
        ordering = ['-time_created']

class NotificationActor(models.Model):
    """
        Through model for actors in the notification, allowing multiple users with individual timestamps.
    """
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)
    actor = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    class Meta:
        # Ensures an actor is added only once per notification
        unique_together = ('notification', 'actor') 
    
    def __str__(self) -> str:
        return f"{self.actor} on {self.notification} at {self.timestamp}"
    class Meta:
        ordering = ['-timestamp']
    

class NewPerfumeReviewNotification(models.Model):
    recipient = models.ForeignKey(UserProfile, related_name='new_review_notifications', on_delete=models.CASCADE)
    actors = models.ManyToManyField(UserProfile) # User who performed the action
    verb = models.CharField(max_length=255)
    target_perfume = models.ForeignKey(Perfume, on_delete=models.PROTECT, null=True, blank=True)
    unread = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def get_actors_display(self):
        actors = self.actors.all().order_by('-newperfumereviewnotification__timestamp')
        actor_count = actors.count()
        print(actor_count, 'actor count')
        if actor_count != 0:
            if actor_count == 1:
                return f'{actors[0].user.username}'
            elif actor_count == 2:
                return f'{actors[0].user.username} and {actors[1].user.username}'
            else:
                return f"{actors[0].user.username} and {actor_count - 1} others"
    class Meta:
        ordering = ['-timestamp']
        

class LikeReviewNotification(models.Model):
    # Might need to just switch this to user to make it easier
    recipient = models.ForeignKey(UserProfile, related_name='like_notifications', on_delete=models.CASCADE)
    actors = models.ManyToManyField(UserProfile) # User who performed the action
    verb = models.CharField(max_length=255)
    target_post = models.ForeignKey(Reviews, on_delete=models.PROTECT, null=True, blank=True)
    unread = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.get_actors_display()} {self.verb}'
    
    def get_actors_display(self):
        actors = self.actors.all().order_by('-likereviewnotification__timestamp')
        actor_count = actors.count()
        print(actor_count, 'actor count')
        if actor_count != 0:
            if actor_count == 1:
                return f'{actors[0].user.username}'
            elif actor_count == 2:
                return f'{actors[0].user.username} and {actors[1].user.username}'
            else:
                return f"{actors[0].user.username} and {actor_count - 1} others"
        
    class Meta:
        ordering = ['-timestamp']
        
# class PerfumeReviewSubscription(models.Model):
#     user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
#     actors = models.ManyToManyField(UserProfile) # User who performed the action
#     verb = models.CharField(max_length=255)
#     target_perfume = models.ForeignKey(Perfume, on_delete=models.PROTECT, null=True, blank=True)
#     unread = models.BooleanField(default=True)
#     timestamp = models.DateTimeField(auto_now_add=True)