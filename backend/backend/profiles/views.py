from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from ..database.models import Perfume
from ..database.models import TestPerfume, PendingPerfumes, EditedPerfume
from django.http.response import JsonResponse, HttpResponse
from rest_framework import generics
from ..accounts.models import User, UserProfile
from .serializers import UserProfileSerializer


class UserProfileView(APIView):
    
    def post(self, request, *args, **kwargs):
        # print(self)
        print(request.data)
        # print(request.user.id)
        if type(request.data) == int:
            user = User.objects.get(id=request.data)
        else:
            user = User.objects.get(username=request.data)
        serializer = UserProfileSerializer(user.userprofile)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    
class AddPointsView(APIView):
    def post(self, request, *args, **kwargs):
        user_profile = request.user.userprofile
        points = request.data.get('points', 0)
        user_profile.add_points(points)
        return JsonResponse({'message': 'points added', 'level': user_profile.level}, status=status.HTTP_200_OK)

        
# class ChangeProfilePictureView(generics.UpdateAPIView):
#     profiles = UserProfile.objects.all()
#     queryset = profiles
#     serializer_class = UserProfileSerializer
#     def update(self,request,*args, **kwargs):
#         instance = self.get_object()
#         instance.profile_picture = 
#         instance.last_profile_picture_change = request.data.get('last_profile_picture_change')
#         serializer = self.get_serializer(data=instance, many=True)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)
#         return Response(serializer.data)
        
        
class ChangeProfilePictureView(APIView):
    
    def put(self, request, *args, **kwargs):
        # print(request.data.get('user'))
        profile = UserProfile.objects.get(id=request.data.get('user'))
        data = {'profile_picture': request.data.get('profile_picture'), 'last_profile_picture_change':request.data.get('last_profile_picture_change')}
        serializer = UserProfileSerializer(profile, data=data)
        if serializer.is_valid():
            # upload to s3
            # image = serializer.validated_data['image']

            # # Save the image to S3
            # s3 = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            #                         aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
            # bucket_name = settings.AWS_STORAGE_BUCKET_NAME
            # image_name = f"uploads/{image.name}"

            # s3.upload_fileobj(image, bucket_name, image_name)
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class GetAmountOfUserReviews(APIView):
#     def post(self, request, *args, **kwargs):
        
#         Review
#         current_user = UserProfile.objects.get(id=request.data['current_user'])
#         reviews = current_user.reviews_set.all()
#         print(reviews)
#         return Response({'Test': 'test'})