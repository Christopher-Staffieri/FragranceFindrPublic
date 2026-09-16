from rest_framework.views import APIView
from rest_framework.response import Response
from ..database.models import UserCollection, Reviews, Rating
from django.db.models import Avg

class DashboardView(APIView):
    def post(self, request, *args, **kwargs):
        print(request)
        collection_size = UserCollection.objects.filter(user=request.data['user_id']).count()
        user_reviews = Reviews.objects.filter(posted_by=request.data['user_profile_id']).count()
        avg_rating = Rating.objects.filter(rated_by=request.data['user_profile_id']).aggregate(Avg('scent_rating'))
        
        print(collection_size)
        print(user_reviews)
        print(avg_rating)
        return Response({'collection_size': collection_size, 'user_reviews': user_reviews, 'avg_scent_rating': avg_rating})

