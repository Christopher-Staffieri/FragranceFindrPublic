

from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from .serializers import RetrieveParentCompanySerializer
from rest_framework.response import Response
from rest_framework import status
from ..database.models import (
    Perfume,
    ValidParfumes,
    UserCollection,
    Rating,
    Reviews,
    ParentCompany,
    Statements, 
    CustomCollection,
    FragranceClassification,
    FragranceNote,
    NoteCategory, 
    Brand, 
    Perfumer,
    FragranceCollection,
    BottleDesigner,
)

from backend.common.serializers import (
    BottleDesignerSerializer,
    BrandSerializer,
    ParentCompanySerializer,
    PerfumerSerializer,
    FragranceCollectionSerializer,
)

from ..database.serializers import (
    RatingSerializer, 
    PostRatingSerializer, 
    ReviewSerializer, 
    PostReviewSerializer, 
    StatementSerializer, 
    PostStatementSerializer,
    CreateCollectionSerializer,
    UserCollectionSerializer,
    CustomCollectionSerializer,
    PostCustomCollectionSerializer,
    FragranceClassificationSerializer,
    PostPerfumeClassificationSerializer,
    PostFragranceNoteSerializer,
    PerfumeDBSerializer,
    LatestDBPerfumeSerializer,
    FragranceProposalSerializer,
    
    
)
# from ..database.models import Perfume, ValidParfumes, UserCollection, Rating, Reviews
# from ..database.models import TestPerfume, PendingPerfumes, ParentCompany, Statements
from django.http.response import JsonResponse, HttpResponse
from rest_framework import generics
from .Paginator import NamePaginator
from django.core.paginator import InvalidPage
from django.http import request
from rest_framework import pagination
from ..research.serializers import PerfumeSerializer, EditedBySerializer
from django.db.models import Avg, Count
from django.db.models.functions import Floor
from ..accounts.models import User, UserProfile


class GetAmountOfUserReviews(APIView):
    def post(self, request, *args, **kwargs):
        
        reviews = Reviews.objects.filter(posted_by=request.data['current_user']).count()
        current_user = UserProfile.objects.get(id=request.data['current_user'])
        # reviews = current_user.reviews_set.all()
        print(reviews)
        return Response({'Test': 'test'})

class GetUserWithName(APIView):
    def post(self, request, *args, **kwargs):
        try:
            user = User.objects.get(username=request.data['username'])
            serializer = EditedBySerializer(user)
            print('printed serililizer data from get')
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as error:
            print(error)
            return Response({'error': 'could not find the requested user'})

class test_parent_companies(generics.RetrieveUpdateDestroyAPIView):
    pagination.PageNumberPagination.page_size = 100 
    serializer_class = RetrieveParentCompanySerializer
    def get_queryset(self):
        perfume = ParentCompany.objects.filter(name__istartswith=f'{self.request.query_params.get('letter')}').values()
        return perfume
    # def get_queryset(self):
    #     perfume = Perfume.objects.select_related('status_key').all()
    #     return perfume

    # def get(self, request, *args, **kwargs):
    #     qs = self.get_queryset()
    #     page = self.paginate_queryset(qs)
    #     return self.get_paginated_response(page)
    
    
class ListPerfumesView(APIView):
    def get(self, request, *args, **kwargs):
        perfumes = Perfume.objects.exclude(confirmed__isnull=True).order_by('date_posted')
        serializer = PerfumeDBSerializer(perfumes, many=True)
        if serializer.is_valid():
            return Response({'data': perfumes, 'status': '200'}, status=status.HTTP_200_OK)
        return Response({'data': serializer.errors, 'status': '404'}, status=status.HTTP_400_BAD_REQUEST)

class PerfumeAutocompleteView(APIView):
    def post(self, request, *args, **kwargs):
        # perfumes = Perfume.objects.validparfumes_set
        
        query = request.data['input']
        print(request.data['input'])
        print('rewquest datra for autocomplete')
       
        if query:
            print('rann')
            results = Perfume.objects.exclude(confirmed__isnull=True).filter(perfume__icontains=query)[:10]
            if len(results) == 0:
                results = Perfume.objects.exclude(confirmed__isnull=True).order_by("perfume")[:10]
                serializer = PerfumeSerializer(results, many=True)
                return Response({'data':serializer.data, 'message': 'Sorry we couldnt find anything that matches that in our database take a look at some other popular fragrances'}) 
            else:
                serializer = PerfumeSerializer(results, many=True)
                return Response({'data':serializer.data, 'message': 'Sorry we couldnt find anything that matches that in our database take a look at some other popular fragrances'})
        else:
            results = Perfume.objects.exclude(confirmed__isnull=True).order_by("perfume")[:10]
            serializer = PerfumeSerializer(results, many=True)
            return Response({'data':serializer.data, 'message': 'Sorry we couldnt find anything that matches that in our database take a look at some other popular fragrances'})
            # results = perfumes.validparfumes_set.order_by("perfume")[:10]
        serializer = PerfumeSerializer(results, many=True)
        return Response(serializer.data)
    
    
class BrandAutocompleteView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', '')
        print(query)
        try:
            if query:
                brands = Brand.objects.filter(name__icontains=query[:10])
            else:
                brands = Brand.objects.all()[:10]
        except Exception as error:
            return Response({'error': error})
        serializer = BrandSerializer(brands, many=True)
        return Response(serializer.data)
    
class PerfumerAutocompleteView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', '')
        print(query)
        try:
            if query:
                brands = Perfumer.objects.filter(name__icontains=query[:10])
            else:
                brands = Perfumer.objects.all()[:10]
        except Exception as error:
            return Response({'error': error})
        serializer = PerfumerSerializer(brands, many=True)
        return Response(serializer.data)
    
class BottleDesignerAutocompleteView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', '')
        print(query)
        try:
            if query:
                bottle_designer = BottleDesigner.objects.filter(name__icontains=query[:10])
            else:
                bottle_designer = BottleDesigner.objects.all()[:10]
        except Exception as error:
            return Response({'error': error})
        serializer = BottleDesignerSerializer(bottle_designer, many=True)
        return Response(serializer.data)
    
class FragranceCollectionAutocompleteView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', '')
        print(query)
        try:
            if query:
                perfume_collections = FragranceCollection.objects.filter(collection__icontains=query[:10])
            else:
                perfume_collections = FragranceCollection.objects.all()[:10]
        except Exception as error:
            return Response({'error': error})
        serializer = FragranceCollectionSerializer(perfume_collections, many=True)
        return Response(serializer.data)
    
class ParentCompanyAutocompleteView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', '')
        print(query)
        try:
            if query:
                parent_company = ParentCompany.objects.filter(collection__icontains=query[:10])
            else:
                parent_company = ParentCompany.objects.all()[:10]
        except Exception as error:
            return Response({'error': error})
        serializer = ParentCompanySerializer(parent_company, many=True)
        return Response(serializer.data)
    
class GetAllFragrancesInDatabaseView(APIView):
    def get(self, request, *args, **kwargs): 
        total_count = Perfume.objects.filter(confirmed__pk=1).count()
        return Response({'total_fragrances': total_count})
    
class GetAllBrandsInDatabaseView(APIView):
    def get(self, request, *args, **kwargs): 
        total_count = Brand.objects.count()
        return Response({'total_brands': total_count})
    
class GetRecentlyAddedFragrances(APIView):
    def get(self, request, *args, **kwargs):
        most_recent = Perfume.objects.filter(confirmed__pk=1).order_by('-date_posted')[:3]
        serializer = LatestDBPerfumeSerializer(most_recent, many=True)
        return Response(serializer.data)
            
        
# class BrandAutocompleteView(APIView):
#     def post(self, request, *args, **kwargs):
#         # perfumes = Perfume.objects.validparfumes_set
        
#         query = request.data['input']
#         print(request.data['input'])
#         print('rewquest datra for autocomplete')
       
#         if query:
#             print('rann')
#             results = Brand.objects.exclude(confirmed__isnull=True).filter(perfume__icontains=query)[:10]
#             if len(results) == 0:
#                 results = Brand.objects.exclude(confirmed__isnull=True).order_by("name")[:10]
#                 serializer = BrandSerializer(results, many=True)
#                 return Response({'data':serializer.data, 'message': 'Sorry we couldnt find anything that matches that in our database take a look at some other popular brands'}) 
#             else:
#                 serializer = BrandSerializer(results, many=True)
#                 return Response({'data':serializer.data, 'message': 'Sorry we couldnt find anything that matches that in our database take a look at some other popular brands'})
#         else:
#             results = Brand.objects.exclude(confirmed__isnull=True).order_by("name")[:10]
#             serializer = BrandSerializer(results, many=True)
#             return Response({'data':serializer.data, 'message': 'Sorry we couldnt find anything that matches that in our database take a look at some other popular brands'})
    
class test_parent_companies_detail(generics.ListCreateAPIView):
    # queryset = ParentCompany.objects.filter(name__istartswith=f'{request.data}').values()
    pagination.PageNumberPagination.page_size = 100 
    serializer_class = RetrieveParentCompanySerializer
    def get_queryset(self):
        perfume = ParentCompany.objects.filter(name__istartswith=f'{self.request.query_params.get('letter')}').values()
        return perfume
    
# class PerfumeView(APIView):
    
#     def post(self, request, *args, **kwargs):
#         # print(self)
#         print(request.data)
#         # print(request.user.id)
#         if type(request.data) == int:
#             perfume = Perfume.objects.get(id=request.data)
#         else:
#             perfume = Perfume.objects.get(perfume=request.data)
#         serializer = PerfumeSerializer(perfume)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
class PerfumeView(APIView):
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        print(type(request.data))
        try:
            if type(request.data) == int:
                perfume = Perfume.objects.get(id=request.data)
            else:
                perfume = Perfume.objects.get(perfume=request.data)
            serializer = PerfumerSerializer(perfume)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as error:
            print(error)
            return Response({'error': 'could not find'})

class GetFragranceProposalView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        print(type(request.data))
        try:
            perfume = Perfume.objects.get(id=request.data)
            serializer = FragranceProposalSerializer(perfume)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as error:
            print(error)
            return Response({'error': 'could not find'})

# //-- Collections --\\
class CreateUserCollectionView(APIView):
    def post(self, request, *args, **kwargs):
        # request.data['rated_by'] = User.objects.get(id=request.data['rated_by'])
        # request.data['rated_perfume'] = Perfume.objects.get(id=request.data['rated_perfume'])
        print(request.data)
        serializer = CreateCollectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = serializer.data.copy()
            data['status'] = '200'
            print(data)
            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetUserCollections(APIView):
    
    def post(self, request, *args, **kwargs):
        try:
            user_collection = UserCollection.objects.filter(user=request.data['user'])
            print(request.data['user'])
            serializer = UserCollectionSerializer(user_collection, many=True)
            print('printed serililizer data from get')
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({'error': 'could not find the requested users collection'})
        # try:
        #     print(user_collection)
        #     # ratings = perfume.rating_set.all()
            
        #     scent_avg_rating = perfume_ratings.aggregate(Avg('scent_rating'))
        #     return Response({'scent_rating': scent_avg_rating})
        # except Exception as error:
        #     print(error)
        #     return Response({"Erorr": 'sorry ran into an error'})

class CheckForPerfumeInUserCollection(APIView):
    def post(self, request, *args, **kwargs):
        collections = UserCollection.objects.all()
        user_collections = collections.get(user=request.data['user'])
        # test = user_collections.get('currently)own')
        currently_own = user_collections.currently_own.filter(id=request.data['perfume'])
        # currently_own.filter()
        data = []
        for field in request.data['fields']:
            
            try:
                print('ran')
                if getattr(user_collections, field).filter(id=request.data['perfume']).exists():
                    print(getattr(user_collections, field).filter(id=request.data['perfume']))
                    serializer = PerfumeSerializer(getattr(user_collections, field).filter(id=request.data['perfume']), many=True)
                    print(serializer.data)
                    data_dict = serializer.data.copy()
                    print(data_dict)
                    data_dict[0]['field'] = field
                    data.append(data_dict)
                    print(data)
                    print('testt')
            except Exception as error:
                print(error)
                print('got error')
        print('ran out loop')
        print(len(data))
        if len(data) == 0:
            return Response({'error':'perfume not in collection'}, status=status.HTTP_200_OK)
        return Response({'data':data}, status=status.HTTP_200_OK) 
    
class UpdateUserCollection(APIView):
    def put(self, request, *args, **kwargs):
        collections = UserCollection.objects.all()
        user_collections = collections.get(user=request.data['user'])
        current_perfume = Perfume.objects.get(id=request.data['perfume'])
        
        print('ran tryy')
        if getattr(user_collections, request.data['field']).filter(id=request.data['perfume']).exists() and request.data['field_status'] == False:
            print('ran if')
            # Need to remove the many to many field relation for this field if data isnt false then just dont do anything
            print(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
            # testt = getattr(user_collections, request.data['field']).remove(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
            testt = getattr(user_collections, request.data['field']).remove(current_perfume)
            print(testt)
            return Response({'success': 'succesfully removed data', 'status': '200'})
    
        elif not getattr(user_collections, request.data['field']).filter(id=request.data['perfume']).exists() and request.data['field_status'] == True:
            # Add the perfume to the many to many field with .add or update
            print(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
            testt = getattr(user_collections, request.data['field']).add(current_perfume)
            print(testt)
            print(getattr(user_collections, request.data['field']))
            # print(err)
            # print(request.data[request.data['field']])
            # if request.data[request.data['field']] == True:
            #     field = request.data['field']
            #     getattr(user_collections, request.data['field']).add(current_perfume)
            #     print('ran add on field', field)
            return Response({'success': 'succesfully added data', 'status': '200'})
        return Response({'error': 'something went very wrong might be trying to remove a field that isnt there'})
# //-- Custom Collections --\\       
class GetCustomUserCollections(APIView):
    def post(self, request, *args, **kwargs):
        user_collection = UserCollection.objects.get(user=request.data['user'])
        
        user_custom_collections = user_collection.customcollection_set.all()
        # print(request.data)
        if 'perfume' in request.data:
            test_collection = user_collection.customcollection_set.all().filter(perfumes=request.data['perfume'])
            print(test_collection)
            print('test collection')
            if not user_custom_collections:
                return Response({'error': 'no custom collections found'})
            else:
                serializer = CustomCollectionSerializer(user_custom_collections, many=True)
                test_collection = user_collection.customcollection_set.all().filter(perfumes=request.data['perfume'])
                return Response(serializer.data)
            print(user_custom_collections)
            print('printed user custom collections')
        else:
            if not user_custom_collections:
                return Response({'error': 'no custom collections found'})
            else:
                serializer = CustomCollectionSerializer(user_custom_collections, many=True)
                # test_collection = user_collection.customcollection_set.all()
                print(user_custom_collections.first())
                print(serializer.data)
                return Response(serializer.data)
        

class CreateCustomCollection(APIView):
    def post(self, request, *args, **kwargs):
        # custom_collections = CustomCollection.objects.all()
        serializer = PostCustomCollectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = serializer.data.copy()
            data['status'] = '200'
            print(data)
            return Response(data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response({'error': 'something went wrong when creating the custom user collection please try again'}, status=status.HTTP_400_BAD_REQUEST)

class CheckForPerfumeInCustomCollection(APIView):
    def post(self, request, *args, **kwargs):
        user_collection = UserCollection.objects.get(user=request.data['user'])
        user_custom_collections = user_collection.customcollection_set.all()
        test_collection = user_collection.customcollection_set.all().filter(perfumes=request.data['perfume'])
        print(test_collection)
        print(user_custom_collections)
        if user_collection.customcollection_set.all().filter(perfumes=request.data['perfume']).exists():
            return Response({'error': 'perfume already in collection'})
        else:
            return Response({'success': 'perfume can be added to the users collection'})
         
        
class UpdateUserCustomCollection(APIView):
    def patch(self, request, *args, **kwargs):
        user_collection = UserCollection.objects.get(user=request.data['user'])
        # user_custom_collection = user_collection.customcollection_set.filter(id=request.data['collection_id'])
        # print(user_custom_collection)
        try:
            user_custom_collection = user_collection.customcollection_set.filter(id=request.data['collection_id'])
            request.data.pop('collection_id')
            request.data.pop('user')
            serializer = CustomCollectionSerializer(user_custom_collection.first(), data=request.data)
            if serializer.is_valid():
                serializer.save()
                data = serializer.data.copy()
                data['status'] = '200'
                print(data)
                return Response(data, status=status.HTTP_200_OK) 
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            print(err)
            return Response({'error': 'something went wrong trying to edit the collection please try again'}, status=status.HTTP_400_BAD_REQUEST)
class DeleteCustomCollection(APIView):
    def delete(self, request, *args, **kwargs):
        user_collection = UserCollection.objects.get(user=request.data['user'])
        user_custom_collection = user_collection.customcollection_set.get(id=request.data['collection_id'])
        user_custom_collection.delete()
        return Response({"success": "Custom collection deleted successfully."}, status=status.HTTP_200_OK)
    

class AddFragranceToCustomCollection(APIView):
    def patch(self, request, *args, **kwargs):
        user_collection = UserCollection.objects.get(user=request.data['user'])
        user_custom_collection = user_collection.customcollection_set.get(id=request.data['collection_id'])
        print(getattr(user_custom_collection, 'perfumes').filter(id=request.data['perfume']).exists())
        if not getattr(user_custom_collection, 'perfumes').filter(id=request.data['perfume']).exists():
            getattr(user_custom_collection, 'perfumes').add(request.data['perfume'])
            return Response({'success': 'succesfully added data', 'status': '200'})
        return Response({'error': 'something went wrong trying to edit the collection please try again'}, status=status.HTTP_400_BAD_REQUEST)
        
class RemoveFragranceFromCustomCollection(APIView):
    def patch(self, request, *args, **kwargs):
        user_collection = UserCollection.objects.get(user=request.data['user'])
        user_custom_collection = user_collection.customcollection_set.get(id=request.data['collection_id'])
        print(getattr(user_custom_collection, 'perfumes').filter(id=request.data['perfume']).exists())
        if getattr(user_custom_collection, 'perfumes').filter(id=request.data['perfume']).exists():
            getattr(user_custom_collection, 'perfumes').remove(request.data['perfume'])
            return Response({'success': 'succesfully removed data', 'status': '200'})
        return Response({'error': 'something went wrong trying to edit the collection please try again'}, status=status.HTTP_400_BAD_REQUEST)
        # if getattr(user_custom_collection, request.data['field']).filter(id=request.data['perfume']).exists() and request.data['field_status'] == False:
        #     print('ran if')
        #     # Need to remove the many to many field relation for this field if data isnt false then just dont do anything
        #     print(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
        #     # testt = getattr(user_collections, request.data['field']).remove(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
        #     testt = getattr(user_collections, request.data['field']).remove(current_perfume)
        #     print(testt)
        #     return Response({'success': 'succesfully removed data', 'status': '200'})
    
        # elif not getattr(user_collections, request.data['field']).filter(id=request.data['perfume']).exists() and request.data['field_status'] == True:
        #     # Add the perfume to the many to many field with .add or update
        #     print(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
        #     testt = getattr(user_collections, request.data['field']).add(current_perfume)
        #     print(testt)
        #     print(getattr(user_collections, request.data['field']))
        #     # print(err)
        #     # print(request.data[request.data['field']])
        #     # if request.data[request.data['field']] == True:
        #     #     field = request.data['field']
        #     #     getattr(user_collections, request.data['field']).add(current_perfume)
        #     #     print('ran add on field', field)
        #     return Response({'success': 'succesfully added data', 'status': '200'})
        return Response({'error': 'something went very wrong might be trying to remove a field that isnt there'})
        #  testt = getattr(user_collections, request.data['field']).add(current_perfume)
        
        
        
        
        
        
        
        
        
        
        # print('ran tryy')
        # if getattr(user_collections, request.data['field']).filter(id=request.data['perfume']).exists() and request.data['field_status'] == False:
        #     print('ran if')
        #     # Need to remove the many to many field relation for this field if data isnt false then just dont do anything
        #     print(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
        #     # testt = getattr(user_collections, request.data['field']).remove(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
        #     testt = getattr(user_collections, request.data['field']).remove(current_perfume)
        #     print(testt)
        #     return Response({'success': 'succesfully removed data', 'status': '200'})
    
        # elif not getattr(user_collections, request.data['field']).filter(id=request.data['perfume']).exists() and request.data['field_status'] == True:
        #     # Add the perfume to the many to many field with .add or update
        #     print(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
        #     testt = getattr(user_collections, request.data['field']).add(current_perfume)
        #     print(testt)
        #     print(getattr(user_collections, request.data['field']))
        #     # print(err)
        #     # print(request.data[request.data['field']])
        #     # if request.data[request.data['field']] == True:
        #     #     field = request.data['field']
        #     #     getattr(user_collections, request.data['field']).add(current_perfume)
        #     #     print('ran add on field', field)
        #     return Response({'success': 'succesfully added data', 'status': '200'})
        return Response({'error': 'something went very wrong might be trying to remove a field that isnt there'})
                
                
                
                
                
                
                
                
        # print(user_collections.currently_own.filter(id=request.data['perfume']))
        # if user_collections.currently_own.filter(id=request.data['perfume']).exists():
            
        # print(currently_own)
        # print(user_collections.(currently_own_id=request.data['perfume']))
        # if user_collections.filter('currently_own').exists():
        #     print('found currently own set')
        #     print(user_collections.currently_own)
        # if user_collections.filter(perfume=request.data['reviewed_perfume']).exists():
        #     print('found review for current perfume')
        #     serializer = ReviewSerializer(user_reviews.filter(reviewed_perfume=request.data['reviewed_perfume']), many=True)
        #     print(serializer.data)
        #     return Response(serializer.data, status=status.HTTP_200_OK)
        # else:
        #     print('didnt find any ratings')
        #     return Response({'error': 'no ratings found'}) 
    
# class UpdateUserCollection(APIView):
#     def put(self, request, *args, **kwargs):
        
#         collections = UserCollection.objects.all()
#         user_collection = collections.filter(user=request.data['user'])
#         # if user_collections.filter(statement_perfume=request.data['statement_perfume']).exists():
#         print('found')
#         # print(user_collections.filter(statement_perfume=request.data['statement_perfume']))
#         # model = user_collections.filter(statement_perfume=request.data['statement_perfume']).first()
#             # request.data.pop('user_id')
#             # request.data.pop('perfume_id')
            
#         serializer = UserCollectionSerializer(user_collection, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
            
#             data = serializer.data.copy()
#             data['status'] = '200'
#             print(data)
#             return Response(data, status=status.HTTP_200_OK) 
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            # print(serializer.data)
            # return Response(serializer.data,status=status.HTTP_200_OK)
        # else:
            # print('didnt find any ratings')
            # return Response({'error': 'no ratings found'}, status=status.HTTP_204_NO_CONTENT)
    

# //-- Ratings --\\  
class CreatePerfumeRatingView(APIView):

    def post(self, request, *args, **kwargs):
        rating = Rating.objects.all()
        # request.data['rated_by'] = User.objects.get(id=request.data['rated_by'])
        # request.data['rated_perfume'] = Perfume.objects.get(id=request.data['rated_perfume'])
        print(request.data)
        serializer = PostRatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = serializer.data.copy()
            data['status'] = '200'
            print(data)
            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetPerfumeAvgRatings(APIView):
    def post(self, request, *args, **kwargs):
        complete_range = list(range(0,11))
        
        scent_ratings_total = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(scent_rating__gt=0).count()
        scent_ratings_avg = Rating.objects.filter(rated_perfume=request.data['perfume']).aggregate(average=Avg('scent_rating'))['average']
        
        scent_individual_ratings = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(scent_rating__gte=0.5, scent_rating__lte=10.0).annotate(rounded_scent_rating=Floor('scent_rating')).values('rounded_scent_rating').annotate(count=Count('id'))
        scent_rating_dict = {entry['rounded_scent_rating']: entry['count'] for entry in scent_individual_ratings}
        final_scent_rating_count = {value: scent_rating_dict.get(value, 0) for value in complete_range}
        
        if scent_ratings_avg == None:
            scent_ratings_avg = 0
            
        sillage_individual_ratings = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(sillage_rating__gte=0.5, sillage_rating__lte=10.0).annotate(rounded_sillage_rating=Floor('sillage_rating')).values('rounded_sillage_rating').annotate(count=Count('id'))
        sillage_rating_dict = {entry['rounded_sillage_rating']: entry['count'] for entry in sillage_individual_ratings}
        final_sillage_rating_count = {value: sillage_rating_dict.get(value, 0) for value in complete_range}
        
        sillage_ratings_total = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(sillage_rating__gt=0).count()
        sillage_ratings_avg = Rating.objects.filter(rated_perfume=request.data['perfume']).aggregate(average=Avg('sillage_rating'))['average']
        if sillage_ratings_avg == None:
            sillage_ratings_avg = 0.0
        
        longevity_individual_ratings = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(longevity_rating__gte=0.5, longevity_rating__lte=10.0).annotate(rounded_longevity_rating=Floor('longevity_rating')).values('rounded_longevity_rating').annotate(count=Count('id'))
        longevity_rating_dict = {entry['rounded_longevity_rating']: entry['count'] for entry in longevity_individual_ratings}
        final_longevity_rating_count = {value: longevity_rating_dict.get(value, 0) for value in complete_range}
        
        longevity_ratings_total = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(longevity_rating__gt=0).count()
        longevity_ratings_avg = Rating.objects.filter(rated_perfume=request.data['perfume']).aggregate(average=Avg('longevity_rating'))['average']
        if longevity_ratings_avg == None:
            longevity_ratings_avg = 0.0
            
        bottle_individual_ratings = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(bottle_rating__gte=0.5, bottle_rating__lte=10.0).annotate(rounded_bottle_rating=Floor('bottle_rating')).values('rounded_bottle_rating').annotate(count=Count('id'))
        bottle_rating_dict = {entry['rounded_bottle_rating']: entry['count'] for entry in bottle_individual_ratings}
        final_bottle_rating_count = {value: bottle_rating_dict.get(value, 0) for value in complete_range}
        
        bottle_ratings_total = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(bottle_rating__gt=0).count()
        bottle_ratings_avg = Rating.objects.filter(rated_perfume=request.data['perfume']).aggregate(average=Avg('bottle_rating'))['average']
        if bottle_ratings_avg == None:
            bottle_ratings_avg = 0.0
            
        price_individual_ratings = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(price_rating__gte=0.5, price_rating__lte=10.0).annotate(rounded_price_rating=Floor('price_rating')).values('rounded_price_rating').annotate(count=Count('id'))
        price_rating_dict = {entry['rounded_price_rating']: entry['count'] for entry in price_individual_ratings}
        final_price_rating_count = {value: price_rating_dict.get(value, 0) for value in complete_range}
            
        price_ratings_total = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(price_rating__gt=0).count()
        price_ratings_avg = Rating.objects.filter(rated_perfume=request.data['perfume']).aggregate(average=Avg('price_rating'))['average']
        
        if price_ratings_avg == None:
            price_ratings_avg = 0.0
            
            
        data = {
            'scent_ratings': {'scent_ratings_avg': scent_ratings_avg, 'scent_ratings_total': scent_ratings_total, 'individual_value_count': final_scent_rating_count},
            'sillage_ratings': {'sillage_ratings_avg': sillage_ratings_avg, 'sillage_ratings_total': sillage_ratings_total, 'individual_value_count': final_sillage_rating_count},
            'longevity_ratings': {'longevity_ratings_avg': longevity_ratings_avg, 'longevity_ratings_total': longevity_ratings_total, 'individual_value_count': final_longevity_rating_count},
            'bottle_ratings': {'bottle_ratings_avg': bottle_ratings_avg, 'bottle_ratings_total': bottle_ratings_total, 'individual_value_count': final_bottle_rating_count},
            'price_ratings': {'price_ratings_avg': price_ratings_avg, 'price_ratings_total': price_ratings_total, 'individual_value_count': final_price_rating_count},
            
        }
        return Response(data, status=status.HTTP_200_OK)
    
class GetRecentPerfumeRatings(APIView):
    def post(self, request, *args, **kwargs):
        try:
            if request.data['type'] == 'SCENT':
                ratings = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(scent_rating__gte=0.5, scent_rating__lte=10.0).order_by('time_rated')[:5]
                serializer = RatingSerializer(ratings, many=True)
                return Response(serializer.data)
            elif request.data['type'] == 'SILLAGE':
                ratings = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(sillage_rating__gte=0.5, sillage_rating__lte=10.0).order_by('time_rated')[:5]
                serializer = RatingSerializer(ratings, many=True)
                return Response(serializer.data)
            elif request.data['type'] == 'LONGEVITY':
                ratings = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(longevity_rating__gte=0.5, longevity_rating__lte=10.0).order_by('time_rated')[:5]
                serializer = RatingSerializer(ratings, many=True)
                return Response(serializer.data)
            elif request.data['type'] == 'BOTTLE':
                ratings = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(bottle_rating__gte=0.5, bottle_rating__lte=10.0).order_by('time_rated')[:5]
                serializer = RatingSerializer(ratings, many=True)
                return Response(serializer.data)
            elif request.data['type'] == 'PRICE':
                ratings = Rating.objects.filter(rated_perfume=request.data['perfume']).filter(price_rating__gte=0.5, price_rating__lte=10.0).order_by('time_rated')[:5]
                serializer = RatingSerializer(ratings, many=True)
                return Response(serializer.data)
        except Exception as err:
            print(err)
            return Response({'error': 'something has went wrong'})
            
        
        # print(ratings)
        
class GetPerfumeRatingsTotal(APIView):
    def post(self, request, *args, **kwargs):
        try:
            perfume_ratings_count = Rating.objects.filter(rated_perfume=request.data).count()
            return Response({'ratings_total': perfume_ratings_count}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)
        

# class GetPerfumeRatings(APIView):
    
#     def post(self, request, *args, **kwargs):
#         perfume = Perfume.objects.get(id=request.data)
#         perfume_ratings = Rating.objects.filter(rated_perfume=request.data)
#         try:
#             print(perfume_ratings)
#             # ratings = perfume.rating_set.all()
#             scent_avg_rating = perfume_ratings.aggregate(Avg('scent_rating'))
#             return Response({'scent_rating': scent_avg_rating})
#         except Exception as error:
#             print(error)
#             return Response({"Erorr": 'sorry ran into an error'})

class GetPerfumeScentRating(APIView):
    
    def post(self, request, *args, **kwargs):
        # perfume = Perfume.objects.get(id=request.data)
        perfume_ratings = Rating.objects.filter(rated_perfume=request.data)
        try:
            print(perfume_ratings)
            # ratings = perfume.rating_set.all()
            scent_avg_rating = perfume_ratings.aggregate(Avg('scent_rating'))
            return Response({'scent_rating': scent_avg_rating})
        except Exception as error:
            print(error)
            return Response({"Erorr": 'sorry ran into an error'})
        
class CheckUserRating(APIView):
    def post(self, request, *args, **kwargs):
        perfume = Perfume.objects.get(id=request.data['perfume_id'])
        
        try:
            # user = UserProfile.objects.get(id=request.data['user_id'])
            # # user_rating = user.rating.all()
            user_ratings = Rating.objects.get(rated_by=request.data['user_id'])
            if user_ratings.rated_perfume == request.data['perfume_id']:
                print(user_ratings)
                serializer = RatingSerializer(user_ratings, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK) 
            else:
                return Response({'error': 'found a review but not for the current perfume'})
            
            
        except Exception as error:
            print(error)
            ratings = Rating.objects.all()
            user_ratings = ratings.filter(rated_by=request.data['user_id'])
            if user_ratings.filter(rated_perfume=request.data['perfume_id']).exists():
                print('found')
                print(user_ratings.filter(rated_perfume=request.data['perfume_id']))
                serializer = RatingSerializer(user_ratings.filter(rated_perfume=request.data['perfume_id']), many=True)
                print(serializer.data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print('didnt find any ratings')
                return Response({'error': 'no ratings found'})
            
class UpdatePerfumeRating(APIView):
    def put(self, request, *args, **kwargs):
        # print(request.data.get('user'))
        try:
            # user = UserProfile.objects.get(id=request.data['user_id'])
            # # user_rating = user.rating.all()
            user_ratings = Rating.objects.get(rated_by=request.data['user_id'])
            if user_ratings.rated_perfume == request.data['perfume_id']:
                # data = request.data.get('updated_rating')
               
                print(user_ratings)
                request.data.pop('user_id')
                request.data.pop('perfume_id')
                serializer = RatingSerializer(user_ratings, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    data = serializer.data.copy()
                    data['status'] = '200'
                    print(data)
                    return Response(data, status=status.HTTP_200_OK) 
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'found a rating but not for the current perfume'})
            
            
        except Exception as error:
            print(error)
            ratings = Rating.objects.all()
            user_ratings = ratings.filter(rated_by=request.data['user_id'])
            if user_ratings.filter(rated_perfume=request.data['perfume_id']).exists():
                print('found')
                print(user_ratings.filter(rated_perfume=request.data['perfume_id']))
                model = user_ratings.filter(rated_perfume=request.data['perfume_id']).first()
                # request.data.pop('user_id')
                # request.data.pop('perfume_id')
                
                serializer = RatingSerializer(model, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    
                    data = serializer.data.copy()
                    data['status'] = '200'
                    print(data)
                    return Response(data, status=status.HTTP_200_OK) 
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                # print(serializer.data)
                # return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                print('didnt find any ratings')
                return Response({'error': 'no ratings found'}, status=status.HTTP_204_NO_CONTENT)
            
# //--Reviews--\\
class CheckUserPerfumeReview(APIView):
    def post(self, request, *args, **kwargs):
        reviews = Reviews.objects.all()
        user_reviews = reviews.filter(posted_by=request.data['posted_by'])
        if user_reviews.filter(reviewed_perfume=request.data['reviewed_perfume']).exists():
            print('found review for current perfume')
            serializer = ReviewSerializer(user_reviews.filter(reviewed_perfume=request.data['reviewed_perfume']), many=True)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print('didnt find any ratings')
            return Response({'error': 'no ratings found'}) 
        # try:
        #     user_review = Reviews.objects.get(posted_by=request.data['posted_by'])
        #     print(user_review.reviewed_perfume.pk)
        #     # print(user_review.objects.get('reviewed_perfume'))
        
        #     if user_review.reviewed_perfume.pk == request.data['reviewed_perfume']:
        #         print(user_review) 
        #         print('ran first')
        #         serializer = ReviewSerializer(user_review, many=True)
        #         return Response(serializer.data, status=status.HTTP_200_OK)
        #     else:
        #         return Response({'error': 'found a rating but not for the current perfume'})
        # except Exception as error:
            # print(error)
            # reviews = Reviews.objects.all()
            # user_reviews = reviews.filter(posted_by=request.data['posted_by'])
            # if user_reviews.filter(reviewed_perfume=request.data['reviewed_perfume']).exists():
            #     print('found review for current perfume')
            #     serializer = ReviewSerializer(user_reviews.filter(reviewed_perfume=request.data['reviewed_perfume']), many=True)
            #     print(serializer.data)
            #     return Response(serializer.data, status=status.HTTP_200_OK)
            # else:
            #     print('didnt find any ratings')
            #     return Response({'error': 'no ratings found'}) 
            
class CreatePerfumeReviewView(APIView):
    def post(self, request, *args, **kwargs):
        reviews = Reviews.objects.all()
        # request.data['rated_by'] = User.objects.get(id=request.data['rated_by'])
        # request.data['rated_perfume'] = Perfume.objects.get(id=request.data['rated_perfume'])
        print(request.data)
        serializer = PostReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = serializer.data.copy()
            data['status'] = '200'
            print(data)
            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CreatePerfumeStatementView(APIView):
    def post(self, request, *args, **kwargs):
        reviews = Reviews.objects.all()
        # request.data['rated_by'] = User.objects.get(id=request.data['rated_by'])
        # request.data['rated_perfume'] = Perfume.objects.get(id=request.data['rated_perfume'])
        print(request.data)
        serializer = PostStatementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = serializer.data.copy()
            data['status'] = '200'
            print(data)
            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdatePerfumeReview(APIView):
    def patch(self, request, *args, **kwargs):
        # print(request.data.get('user'))
        try:
            # user = UserProfile.objects.get(id=request.data['user_id'])
            # # user_rating = user.rating.all()
            user_reviews = Reviews.objects.get(posted_by=request.data['posted_by'])
            if user_reviews.reviewed_perfume.id == request.data['reviewed_perfume']:
                # data = request.data.get('updated_rating')
               
                print(user_reviews)
                request.data.pop('posted_by')
                request.data.pop('reviewed_perfume')
                serializer = ReviewSerializer(user_reviews, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    data = serializer.data.copy()
                    data['status'] = '200'
                    print(data)
                    return Response(data, status=status.HTTP_200_OK) 
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'found a review but not for the current perfume'})
            
            
        except Exception as error:
            print(error)
            reviews = Reviews.objects.all()
            user_reviews = reviews.filter(posted_by=request.data['posted_by'])
            if user_reviews.filter(reviewed_perfume=request.data['reviewed_perfume']).exists():
                print('found')
                print(user_reviews.filter(reviewed_perfume=request.data['reviewed_perfume']))
                model = user_reviews.filter(reviewed_perfume=request.data['reviewed_perfume']).first()
                # request.data.pop('user_id')
                # request.data.pop('perfume_id')
                
                serializer = ReviewSerializer(model, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    
                    data = serializer.data.copy()
                    data['status'] = '200'
                    print(data)
                    return Response(data, status=status.HTTP_200_OK) 
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                # print(serializer.data)
                # return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                print('didnt find any ratings')
                return Response({'error': 'no ratings found'}, status=status.HTTP_204_NO_CONTENT)          

# //-- Statements --\\ 

class UpdateStatementAwards(APIView):
    def patch(self, request, *args, **kwargs):
        # reviews = Reviews.objects.all()
        statement = Statements.objects.filter(posted_by=request.data['statement_posted_by'])
        selected_statement = statement.filter(statement_perfume=request.data['perfume']).first() # going to be a userProfile id
        current_user = UserProfile.objects.get(id=request.data['awarded_by'])
        # current_perfume = Perfume.objects.get(id=request.data['perfume'])
        print(getattr(selected_statement, 'awards'))
        # if selected_review.upvotes_set.all()
        if getattr(selected_statement, 'awards').filter(id=request.data['awarded_by']).exists() and request.data['award_status'] == False:
            print('got like for user on current review')
            testt = getattr(selected_statement, 'awards').remove(current_user)
            return Response({'success': 'succesfully removed data', 'status': '200'})
        elif not getattr(selected_statement, 'awards').filter(id=request.data['awarded_by']).exists() and request.data['award_status'] == True :
            print('no like found by user')
            testt = getattr(selected_statement, 'awards').add(current_user)
            return Response({'success': 'succesfully added data', 'status': '200'})
        return Response({'error': 'something went very wrong might be trying to remove a field that isnt there'})

      
            
class CheckUserPerfumeStatements(APIView):
    def post(self, request, *args, **kwargs):
        statements = Statements.objects.all()
        user_statements = statements.filter(posted_by=request.data['posted_by'])
        if user_statements.filter(statement_perfume=request.data['statement_perfume']).exists():
            print('found review for current perfume')
            serializer = StatementSerializer(user_statements.filter(statement_perfume=request.data['statement_perfume']), many=True)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print('didnt find any ratings')
            return Response({'error': 'no ratings found'})  


    
# class UpdatePerfumeStatement(APIView):
#     def put(self, request, *args, **kwargs):
        
#         statements = Statements.objects.all()
#         user_statements = statements.filter(posted_by=request.data['posted_by'])
#         if user_statements.filter(statement_perfume=request.data['statement_perfume']).exists():
#             print('found')
#             print(user_statements.filter(statement_perfume=request.data['statement_perfume']))
#             model = user_statements.filter(statement_perfume=request.data['statement_perfume']).first()
#             # request.data.pop('user_id')
#             # request.data.pop('perfume_id')
            
#             serializer = StatementSerializer(model, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
                
#                 data = serializer.data.copy()
#                 data['status'] = '200'
#                 print(data)
#                 return Response(data, status=status.HTTP_200_OK) 
#             else:
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#             # print(serializer.data)
#             # return Response(serializer.data,status=status.HTTP_200_OK)
#         else:
#             print('didnt find any ratings')
#             return Response({'error': 'no ratings found'}, status=status.HTTP_204_NO_CONTENT)
        
class UpdatePerfumeStatement(APIView):
    def patch(self, request, *args, **kwargs):
        # print(request.data.get('user'))
        try:
            # user = UserProfile.objects.get(id=request.data['user_id'])
            # # user_rating = user.rating.all()
            user_statements = Statements.objects.get(posted_by=request.data['posted_by'])
            if user_statements.statement_perfume.id == request.data['reviewed_perfume']:
                # data = request.data.get('updated_rating')
               
                print(user_statements)
                request.data.pop('posted_by')
                request.data.pop('reviewed_perfume')
                serializer = StatementSerializer(user_statements, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    data = serializer.data.copy()
                    data['status'] = '200'
                    print(data)
                    return Response(data, status=status.HTTP_200_OK) 
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'found a statement but not for the current perfume'})
            
            
        except Exception as error:
            print(error)
            statements = Statements.objects.all()
            user_statements = statements.filter(posted_by=request.data['posted_by'])
            if user_statements.filter(statement_perfume=request.data['reviewed_perfume']).exists():
                print('found')
                print(user_statements.filter(statement_perfume=request.data['reviewed_perfume']))
                model = user_statements.filter(statement_perfume=request.data['reviewed_perfume']).first()
                # request.data.pop('user_id')
                # request.data.pop('perfume_id')
                
                serializer = StatementSerializer(model, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    
                    data = serializer.data.copy()
                    data['status'] = '200'
                    print(data)
                    return Response(data, status=status.HTTP_200_OK) 
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                # print(serializer.data)
                # return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                print('didnt find any ratings')
                return Response({'error': 'no ratings found'}, status=status.HTTP_204_NO_CONTENT)     
        
class GetUserFragranceClassification(APIView):
    def post(self, request, *args, **kwargs):
        classifications = FragranceClassification.objects.all()
        current_perfume_classifications = classifications.filter(perfume=request.data['perfume'])
        print('printed current')
        # test = current_perfume_classifications.filter(user=request.data['user'])
        print(current_perfume_classifications.filter(user=request.data['user']))
        if current_perfume_classifications.filter(user=request.data['user']).exists():
            serializer = FragranceClassificationSerializer(current_perfume_classifications.filter(user=request.data['user']), many=True)
            print(serializer.data)
            print('printed data for get')
            return Response(serializer.data)
        else:
            return Response({'error': 'No classification data found'})
        
class CreatePerfumeClassificationView(APIView):
    def post(self, request, *args, **kwargs):
        # reviews = Reviews.objects.all()
        # request.data['rated_by'] = User.objects.get(id=request.data['rated_by'])
        # request.data['rated_perfume'] = Perfume.objects.get(id=request.data['rated_perfume'])
        print(request.data)
        print('printed classification data')
        serializer = PostPerfumeClassificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'An Unexpected Error Has Occured Please Try Again'}, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateUserFragranceClassification(APIView):
    def patch(self, request, *args, **kwargs):
        classifications = FragranceClassification.objects.all()
        current_perfume_classifications = classifications.filter(perfume=request.data['perfume'])
  
        try:
            user_fragrance_classification = current_perfume_classifications.filter(user=request.data['user'])
            request.data.pop('perfume')
            request.data.pop('user')
            serializer = FragranceClassificationSerializer(user_fragrance_classification.first(), data=request.data)
            if serializer.is_valid():
                serializer.save()
                # data = serializer.data.copy()
                # data['status'] = '200'
                # print(data)
                return Response(serializer.data, status=status.HTTP_200_OK) 
            else:
                print(serializer.errors)
                return Response({"error": "Something went wrong while attemping to update the fragrance classification please try again."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            print(err)
            return Response({'error': 'Something went wrong while attemping to update the fragrance classification please try again.'}, status=status.HTTP_400_BAD_REQUEST)
        
class CreateFragranceNote(APIView):
    def post(self, request, *args, **kwargs):
        notes = FragranceNote.objects.all()
        if notes.filter(note=request.data['note']).exists():
            return Response({'already exists': 'sorry the note already exists in the data base'})
        else:
            category = NoteCategory.objects.get(category=request.data['category'])
            print(category.id)
            request.data['category'] = category.id
            print(request.data)
            serializer = PostFragranceNoteSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                print(serializer.data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            print(serializer.errors)
            return Response({'error': 'something went wrong when trying to create the fragrance note please try again.'})
        
class DisplayReviews(APIView):
    def post(self, request, *args, **kwargs):
        reviews = Reviews.objects.all()
        current_perfume_reviews = reviews.filter(reviewed_perfume=request.data['perfume'])
        current_perfume_rating_display = Rating.objects.filter(rated_perfume=request.data['perfume'])
        rating_serializer = RatingSerializer(current_perfume_rating_display, many=True)
        serializer = ReviewSerializer(current_perfume_reviews, many=True)
        combined_data = []
        # print(rating_serializer.data)
        for review in serializer.data:
            combined = review.copy()
            combined.update({'user_total_reviews': Reviews.objects.filter(posted_by=review['posted_by']['id']).count()})
            print(review)
            print('printed review')
            
            for i in rating_serializer.data: 
                if i['rated_by']['id'] == review['posted_by']['id']:
                    combined.update(i)
                    print(combined)
                    print('printed combined')
                    combined_data.append(combined)
            # combined_data.append(review)
                # print(review['posted_by']['id'])
                

        #     rating = rating_serializer.data.get(review['posted_by'])
        #     print(rating)
        #     print('printed rating')
        return Response(combined_data)
    
class DisplayStatements(APIView):
    def post(self, request, *args, **kwargs):
        statements = Statements.objects.all()
        current_perfume_statements = statements.filter(statement_perfume=request.data['perfume'])
        current_perfume_rating_display = Rating.objects.filter(rated_perfume=request.data['perfume'])
        rating_serializer = RatingSerializer(current_perfume_rating_display, many=True)
        serializer = StatementSerializer(current_perfume_statements, many=True)
        combined_data = []
        # print(rating_serializer.data)
        for statement in serializer.data:
            combined = statement.copy()
            combined.update({'user_total_statements': Statements.objects.filter(posted_by=statement['posted_by']['id']).count()})
            # print(statement)
            # print('printed statement')
            print(combined)
            print('combined #1')
            
            for i in rating_serializer.data: 
                if i['rated_by']['id'] == statement['posted_by']['id']:
                    combined.update(i)
                    print(combined)
                    print('combined #2')
                    combined_data.append(combined)
                    print(combined)
                    print('combined #3')
            # combined_data.append(statement)
            print(combined)
            print('combined #4')
                # print(review['posted_by']['id'])
                

        #     rating = rating_serializer.data.get(review['posted_by'])
        #     print(rating)
        #     print('printed rating')
        print('combined data #5')
        print(combined_data)
        return Response(combined_data)

class UpdateReviewAwards(APIView):
    def patch(self, request, *args, **kwargs):
        # reviews = Reviews.objects.all()
        review = Reviews.objects.filter(posted_by=request.data['review_posted_by'])
        selected_review = review.filter(reviewed_perfume=request.data['perfume']).first() # going to be a userProfile id
        current_user = UserProfile.objects.get(id=request.data['awarded_by'])
        # current_perfume = Perfume.objects.get(id=request.data['perfume'])
        print(getattr(selected_review, 'awards'))
        # if selected_review.upvotes_set.all()
        if getattr(selected_review, 'awards').filter(id=request.data['awarded_by']).exists() and request.data['award_status'] == False:
            print('got like for user on current review')
            testt = getattr(selected_review, 'awards').remove(current_user)
            return Response({'success': 'succesfully removed data', 'status': '200'})
        elif not getattr(selected_review, 'awards').filter(id=request.data['awarded_by']).exists() and request.data['award_status'] == True :
            print('no like found by user')
            testt = getattr(selected_review, 'awards').add(current_user)
            return Response({'success': 'succesfully added data', 'status': '200'})
        # print('ran tryy')
        # if getattr(selected_review, 'up_votes').filter(id=request.data['perfume']).exists() and request.data['field_status'] == False:
        #     print('ran if')
        #     # Need to remove the many to many field relation for this field if data isnt false then just dont do anything
        #     print(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
        #     # testt = getattr(user_collections, request.data['field']).remove(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
        #     testt = getattr(user_collections, request.data['field']).remove(current_perfume)
        #     print(testt)
        #     return Response({'success': 'succesfully removed data', 'status': '200'})
    
        # elif not getattr(user_collections, request.data['field']).filter(id=request.data['perfume']).exists() and request.data['field_status'] == True:
        #     # Add the perfume to the many to many field with .add or update
        #     print(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
            # testt = getattr(user_collections, request.data['field']).add(current_perfume)
        #     print(testt)
        #     print(getattr(user_collections, request.data['field']))
        
        #     return Response({'success': 'succesfully added data', 'status': '200'})
        return Response({'error': 'something went very wrong might be trying to remove a field that isnt there'})
        
class UpdateReviewLikes(APIView):
    def patch(self, request, *args, **kwargs):
        # reviews = Reviews.objects.all()
        review = Reviews.objects.filter(posted_by=request.data['review_posted_by'])
        selected_review = review.filter(reviewed_perfume=request.data['perfume']).first() # going to be a userProfile id
        current_user = UserProfile.objects.get(id=request.data['liked_by'])
        # current_perfume = Perfume.objects.get(id=request.data['perfume'])
        print(getattr(selected_review, 'up_votes'))
        # if selected_review.upvotes_set.all()
        if getattr(selected_review, 'up_votes').filter(id=request.data['liked_by']).exists() and request.data['like_status'] == False:
            print('got like for user on current review')
            testt = getattr(selected_review, 'up_votes').remove(current_user)
            return Response({'success': 'succesfully removed data', 'status': '200'})
        elif not getattr(selected_review, 'up_votes').filter(id=request.data['liked_by']).exists() and request.data['like_status'] == True :
            print('no like found by user')
            testt = getattr(selected_review, 'up_votes').add(current_user)
            return Response({'success': 'succesfully added data', 'status': '200'})
        # print('ran tryy')
        # if getattr(selected_review, 'up_votes').filter(id=request.data['perfume']).exists() and request.data['field_status'] == False:
        #     print('ran if')
        #     # Need to remove the many to many field relation for this field if data isnt false then just dont do anything
        #     print(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
        #     # testt = getattr(user_collections, request.data['field']).remove(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
        #     testt = getattr(user_collections, request.data['field']).remove(current_perfume)
        #     print(testt)
        #     return Response({'success': 'succesfully removed data', 'status': '200'})
    
        # elif not getattr(user_collections, request.data['field']).filter(id=request.data['perfume']).exists() and request.data['field_status'] == True:
        #     # Add the perfume to the many to many field with .add or update
        #     print(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
            # testt = getattr(user_collections, request.data['field']).add(current_perfume)
        #     print(testt)
        #     print(getattr(user_collections, request.data['field']))
        
        #     return Response({'success': 'succesfully added data', 'status': '200'})
        return Response({'error': 'something went very wrong might be trying to remove a field that isnt there'})
    
class UpdateReviewDislikes(APIView):
    def patch(self, request, *args, **kwargs):
        # reviews = Reviews.objects.all()
        review = Reviews.objects.filter(posted_by=request.data['review_posted_by'])
        selected_review = review.filter(reviewed_perfume=request.data['perfume']).first() # going to be a userProfile id
        current_user = UserProfile.objects.get(id=request.data['downvoted_by'])
        # current_perfume = Perfume.objects.get(id=request.data['perfume'])
        print(getattr(selected_review, 'down_votes'))
        # if selected_review.upvotes_set.all()
        if getattr(selected_review, 'down_votes').filter(id=request.data['downvoted_by']).exists() and request.data['downvote_status'] == False:
            print('got like for user on current review')
            testt = getattr(selected_review, 'down_votes').remove(current_user)
            return Response({'success': 'succesfully removed data', 'status': '200'})
        elif not getattr(selected_review, 'down_votes').filter(id=request.data['downvoted_by']).exists() and request.data['downvote_status'] == True :
            print('no like found by user')
            testt = getattr(selected_review, 'down_votes').add(current_user)
            return Response({'success': 'succesfully added data', 'status': '200'})
        # print('ran tryy')
        # if getattr(selected_review, 'up_votes').filter(id=request.data['perfume']).exists() and request.data['field_status'] == False:
        #     print('ran if')
        #     # Need to remove the many to many field relation for this field if data isnt false then just dont do anything
        #     print(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
        #     # testt = getattr(user_collections, request.data['field']).remove(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
        #     testt = getattr(user_collections, request.data['field']).remove(current_perfume)
        #     print(testt)
        #     return Response({'success': 'succesfully removed data', 'status': '200'})
    
        # elif not getattr(user_collections, request.data['field']).filter(id=request.data['perfume']).exists() and request.data['field_status'] == True:
        #     # Add the perfume to the many to many field with .add or update
        #     print(getattr(user_collections, request.data['field']).filter(id=request.data['perfume']))
            # testt = getattr(user_collections, request.data['field']).add(current_perfume)
        #     print(testt)
        #     print(getattr(user_collections, request.data['field']))
        
        #     return Response({'success': 'succesfully added data', 'status': '200'})
        return Response({'error': 'something went very wrong might be trying to remove a field that isnt there'})
                
        # fragrance = Perfume.objects.get(id=request.data['perfume'])
        # classification = fragrance.fragranceclassification.all()
        # print(current_perfume_classifications)
        # print(request.data.get('user'))
        # try:
          
        #     user_statements = Statements.objects.get(posted_by=request.data['posted_by'])
        #     if user_statements.statement_perfume == request.data['statement_perfume']:
        #         # data = request.data.get('updated_rating')
               
        #         print(user_statements)
        #         # request.data.pop('posted_by')
        #         # request.data.pop('reviewed_perfume')
        #         serializer = StatementSerializer(user_statements, data=request.data)
        #         if serializer.is_valid():
        #             serializer.save()
        #             data = serializer.data.copy()
        #             data['status'] = '200'
        #             print(data)
        #             return Response(data, status=status.HTTP_200_OK) 
        #         else:
        #             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #     else:
        #         return Response({'error': 'found a review but not for the current perfume'})
            
            
        # except Exception as error:
            # print(error)
            # statements = Statements.objects.all()
            # user_statements = statements.filter(posted_by=request.data['posted_by'])
            # if user_statements.filter(statement_perfume=request.data['statement_perfume']).exists():
            #     print('found')
            #     print(user_statements.filter(statement_perfume=request.data['statement_perfume']))
            #     model = user_statements.filter(statement_perfume=request.data['statement_perfume']).first()
            #     # request.data.pop('user_id')
            #     # request.data.pop('perfume_id')
                
            #     serializer = StatementSerializer(model, data=request.data)
            #     if serializer.is_valid():
            #         serializer.save()
                    
            #         data = serializer.data.copy()
            #         data['status'] = '200'
            #         print(data)
            #         return Response(data, status=status.HTTP_200_OK) 
            #     else:
            #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            #     # print(serializer.data)
            #     # return Response(serializer.data,status=status.HTTP_200_OK)
            # else:
            #     print('didnt find any ratings')
            #     return Response({'error': 'no ratings found'}, status=status.HTTP_204_NO_CONTENT)      
# class PostPerfumeReview(APIView):
#     def post(self, request, *args, **kwargs):
        
       
        # finally:
        #     print('didnt find any ratings')
        #     return Response({'error': 'no ratings found'}, status=status.HTTP_204_NO_CONTENT)
        # if not rating.filter(rated_perfume=request.data['perfume_id']).exists():
        #     print('didnt find any ratings')
        #     return Response({'error': 'no ratings found'}, status=status.HTTP_204_NO_CONTENT)
        # else:
        #     print('found ratings')
        #     ratings = perfume.rating_set.filter(rated_by=request.data['user_id'])
        #     serializer = RatingSerializer(ratings)
        #     return Response(serializer.data, status=status.HTTP_200_OK)
            
            
        # if not perfume.rating_set.filter(rated_by=request.data.user)
        
        
    # user = User.objects.get(id=request.user.id)
    #     if not user.groups.filter(name='Research_Auditor').exists():
        
    # def get_queryset(self):
    #     perfume = Perfume.objects.select_related('status_key').all()
    #     return perfume

    # def get(self, request, *args, **kwargs):
    #     qs = self.get_queryset()
    #     page = self.paginate_queryset(qs)
    #     return self.get_paginated_response(page)

# class get_parent_company(APIView):
    
#     def get(self, request):
#         companies = ParentCompany.objects.filter(name__istartswith=f'{request.data}').values()
#         print(request.data)
#         # print(perfumes)
#         serializer = RetrieveParentCompanySerializer(companies, many=True)
#         # return HttpResponse(serializer.data, )
#         return JsonResponse(serializer.data, safe=False)

# class get_parent_company(generics.GenericAPIView):
#     queryset = ParentCompany.objects.all()
#     serializer_class = RetrieveParentCompanySerializer
#     pagination_class = NamePaginator(queryset, \
#                                         on='name', per_page=100)


# class get_parent_company(APIView):
    
#     def get():
        
#         companies = ParentCompany.objects.all()
#         paginator = NamePaginator(companies, \
#                                     on='name', per_page=100)
#         try:
#             page = int(request.GET.get('page', '1'))
#         except ValueError:
#             page = 1

#         try:
#             page = paginator.page(page)
#         except (InvalidPage):
#             page = paginator.page(paginator.num_pages)

#         return JsonResponse( {"page": page})