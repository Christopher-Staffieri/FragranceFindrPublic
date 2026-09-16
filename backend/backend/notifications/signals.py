

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import m2m_changed, post_save
from django.dispatch import receiver
from backend.database.models import Reviews, Perfume, Statements
from backend.notifications.models import LikeReviewNotification, NewPerfumeReviewNotification, Notification, NotificationActor
from backend.accounts.models import UserProfile
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

@receiver(m2m_changed, sender=Reviews.up_votes.through)
def create_like_notification(sender, instance, action, reverse, model, pk_set, **kwargs):
    print('ran signal')
    print(instance)
    print(action)
    print(model)
    print(instance.posted_by)
    print(sender)
    print(reverse)
    if action == 'post_add':
        review = instance.review
        recipient = instance.posted_by
        # channel_layer = get_channel_layer()
        # actor = instance.liked_by
        likers = UserProfile.objects.filter(pk__in=pk_set)
        liking_users = likers.exclude(pk=recipient.pk)
        print(likers)
        print(pk_set)
        print('printed likers and pk set')
        if not liking_users.exists():
            return
        
        
        
        notification, _ = Notification.objects.get_or_create(
            recipient=recipient,
            type = Notification.NotificationType.REVIEW_LIKE,
            target=instance.reviewed_perfume.perfume,
            message = 'liked your review',
            related_id = instance.id,
            # unread=True,
            defaults={'time_created': timezone.now()}
        )
        # Add actors to the notification
        for user in liking_users:
            NotificationActor.objects.get_or_create(notification=notification, actor=user)
      
                
                
        
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'user_{recipient.id}',
            {
                'type': 'send notification',
                'message': f"liked review",
                'type': notification.type,
                
            }
        )
              
@receiver(post_save, sender=Reviews)  
def send_review_posted_notification(sender, instance, created, **kwargs):
    
    if created:
        perfume = instance.reviewed_perfume
        subscribers = perfume.review_subscribers.exclude(id=instance.posted_by.id)
        channel_layer = get_channel_layer()
        for subscriber in subscribers:
            if subscriber != instance.posted_by:
                
                notification, _ = Notification.objects.get_or_create(
                    recipient = subscriber,
                    type=Notification.NotificationType.REVIEW,
                    message='posted a new review on perfume',
                    target=perfume.perfume,
                    related_id=instance.id,
                    # unread = True,
                    defaults={'time_created': timezone.now()}
                )
                
                NotificationActor.objects.get_or_create(notification=notification, actor=subscriber)
                
                
                async_to_sync(channel_layer.group_send)(
                    f'user_{subscriber.id}',
                    {
                        'type': 'send_notification',
                        'message': 'posted a review',
                        'type': notification.type,
                    }
                )
                
@receiver(post_save, sender=Statements)  
def send_statement_posted_notification(sender, instance, created, **kwargs):
    
    if created:
        perfume = instance.statement_perfume
        subscribers = perfume.statement_subscribers.exclude(id=instance.posted_by.id)
        channel_layer = get_channel_layer()
        for subscriber in subscribers:
            if subscriber != instance.posted_by:
                
                notification, _ = Notification.objects.get_or_create(
                    recipient = subscriber,
                    type=Notification.NotificationType.REVIEW,
                    message='posted a new statement on perfume',
                    target=perfume.perfume,
                    related_id=instance.id,
                    # unread = True,
                    defaults={'time_created': timezone.now()}
                )
                
                NotificationActor.objects.get_or_create(notification=notification, actor=subscriber)
                
                
                async_to_sync(channel_layer.group_send)(
                    f'user_{subscriber.id}',
                    {
                        'type': 'send_notification',
                        'message': 'posted a statement',
                        'type': notification.type,
                    }
                )

# @receiver(post_save, sender=Statements)  
# def send_photo_posted_notification(sender, instance, created, **kwargs):
    
#     if created:
#         perfume = instance.reviewed_perfume
#         subscribers = perfume.photo_subscribers.exclude(id=instance.posted_by.id)
#         channel_layer = get_channel_layer()
#         for subscriber in subscribers:
#             if subscriber != instance.posted_by:
                
#                 notification, _ = Notification.objects.get_or_create(
#                     recipient = subscriber,
#                     type=Notification.NotificationType.REVIEW,
#                     message='posted a new photo on perfume',
#                     target=perfume.perfume,
#                     related_id=instance.id,
#                     # unread = True,
#                     defaults={'time_created': timezone.now()}
#                 )
                
#                 NotificationActor.objects.get_or_create(notification=notification, actor=subscriber)
                
                
#                 async_to_sync(channel_layer.group_send)(
#                     f'user_{subscriber.id}',
#                     {
#                         'type': 'send_notification',
#                         'message': 'posted a photo',
#                         'type': notification.type,
#                     }
#                 )




# @receiver(post_save, sender=Reviews)           
# def new_review_created_notification(sender, instance, created, **kwargs):
#     if created:
#         perfume = instance.reviewed_perfume
#         print(sender)
#         print(perfume)
#         print('printed perfume')
#         subscribers = perfume.review_subscribers.exclude(id=instance.posted_by.id)
#         channel_layer = get_channel_layer()
        
#         for subscriber in subscribers:
#             if subscriber != instance.posted_by:
#                 notification = NewPerfumeReviewNotification.objects.create(
#                     recipient=subscriber,
#                     verb='posted a new review on',
#                     target_perfume=perfume,
#                     # defaults={'timestamp': timezone.now()}
#                 )
#                 notification.actors.add(subscriber)
#                 notification.timestamp = timezone.now()
#                 notification.unread = True
#                 notification.save()
                
#                 # serializer = 
#                 notification_data = {
#                     'id': notification.id,
#                     'actors_display': notification.get_actors_display(),
#                     'verb': notification.verb,
#                     'target_perfume_name': perfume.perfume,
#                     'timestamp': notification.timestamp,
#                     'unread': notification.unread,
#                 }
#             async_to_sync(channel_layer.group_send)(
#                 f'new_review_notifications_{subscriber.id}',
#                 {
#                     'type': 'notification_message',
#                     'content': notification_data
#                 }
#             )
            
        
        
        
        
        # for pk in pk_set:
        #     actor = model.objects.get(pk=pk)
            
        #     if actor !=  recipient:
        #         notification = LikeReviewNotification.objects.create(
        #             recipient=recipient,
        #             actor=actor,
        #             verb='liked your post',
        #             target_post=instance
        #         )
        
        #     notification_data ={
        #         'id': notification.id,
        #         'actor': notification.actor.id,
        #         'verb': notification.verb,
        #         'timestamp': notification.timestamp.isoformat()
        #     }
        #     async_to_sync(channel_layer.group_send)(
        #         f'notifications_{recipient.id}',
        #         {
        #             'type': 'notification_message',
        #             'content': notification_data
        #         }
        # )