from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status, permissions

from .serializers import UserNotificationSerializer, NewPerfumeReviewNotificationSerializer, NotificationSerializer
from backend.notifications.models import LikeReviewNotification, NewPerfumeReviewNotification, Notification
from django.shortcuts import get_object_or_404
from backend.research.models import Perfume



# class GetUserNotifications(APIView):
#     def post(self, request, *args, **kwargs):
        
#         user_notifications = LikeReviewNotification.objects.filter(recipient=request.data['user'])
#         user_subscription_notifications = NewPerfumeReviewNotification.objects.filter(recipient=request.data['user'])
        
#         serializer1 = UserNotificationSerializer(user_notifications, many=True)
#         serializer2 = NewPerfumeReviewNotificationSerializer(user_subscription_notifications, many=True)
#         return Response({'user_notifications' : serializer1.data, 'user_subscription_notifications': serializer2.data})

class GetUserNotifications(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        user_notifications = Notification.objects.filter(recipient=request.data['user'])
        serializer = NotificationSerializer(user_notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MarkNotificationsAsRead(APIView):
    
    def post(self, request, *args, **kwargs):
        notifications = LikeReviewNotification.objects.filter(recipient=request.data['user'], unread=True)
        notifications.update(unread=False)
        serializer = UserNotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class PerfumeSubscribe(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        perfume = get_object_or_404(Perfume, pk=request.data['perfume_id'])
        if request.data['subscription_type'] == 'reviews':
            perfume.review_subscribers.add(request.data['user'])
        elif request.data['subscription_type'] == 'statements':
            perfume.statement_subscribers.add(request.data['user'])
        else:
            perfume.photo_subscribers.add(request.data['user'])
        return Response({'status': 'subscribed'}, status= status.HTTP_200_OK)
    
class PerfumeUnsubscribe(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        perfume = get_object_or_404(Perfume, pk=request.data['perfume_id'])
        # perfume.review_subscribers.remove(request.data['user'])
        if request.data['subscription_type'] == 'reviews':
            perfume.review_subscribers.remove(request.data['user'])
        elif request.data['subscription_type'] == 'statements':
            perfume.statement_subscribers.remove(request.data['user'])
        else:
            perfume.photo_subscribers.remove(request.data['user'])
        return Response({'status': 'unsubscribed'}, status=status.HTTP_200_OK)

class CheckIfUserIsSubscribed(APIView):
    def post(self, request, *args, **kwargs):
        # subscription_type = request.data['subscription_type']
        current_perfume = Perfume.objects.get(id=request.data['perfume_id'])
        subscriptions = []
        for subscription_type in request.data['subscription_type']:
            if subscription_type == 'reviews':
                
                if (current_perfume.review_subscribers.filter(id=request.data['user'])):
                    subscriptions.append({'reviews': True})
                else:
                    subscriptions.append({'reviews': False})
                    
            if subscription_type == 'statements':
                if (current_perfume.statement_subscribers.filter(id=request.data['user'])):
                    subscriptions.append({'statements': True})
                else:
                    subscriptions.append({'statements': False})
                    
            if subscription_type == 'photos':
                if (current_perfume.photo_subscribers.filter(id=request.data['user'])):
                    subscriptions.append({'photos': True})
                else:
                    subscriptions.append({'photos': False})
        return Response(subscriptions, status=status.HTTP_200_OK)
