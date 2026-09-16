from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from .serializers import (
    ComposeResearchSerializer,
    GetPendingProposalsSerializer,
    PendingPerfumeSerializer,
    EditedPerfumeSerializer,
    CheckPerfumeEditsSerializer, 
    PerfumeSerializer, 
    SourcesSerializer, 
    DiscussionSerializer,
    ProposeProposalEditsSerializer,
    GetSourcesSerializer
)

from backend.common.serializers import (
    FragranceSourceSerializer,
    RetriveSourcesSerializer
)

from backend.profiles.serializers import UserProfileSerializer
from backend.profiles.models import UserProfile

from backend.research.models import ProposedSources

from rest_framework.response import Response
from rest_framework import status
from ..database.models import Perfume
from ..database.models import TestPerfume, PendingPerfumes, EditedPerfume, ValidParfumes
from django.http.response import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics
from ..accounts.models import User


# from allauth.headless.base.views import (
#     AuthenticatedAPIView,
#     APIView,
# )

from allauth.headless.base.response import (
    APIResponse,
    AuthenticationResponse,
    ConflictResponse,
    ForbiddenResponse,
)

class test_compose(APIView):
    
    def get(self, request):
        perfumes = TestPerfume.objects.all()
        serializer = ComposeResearchSerializer(perfumes, many=True)
        # return HttpResponse(serializer.data, )
        return JsonResponse(serializer.data, safe=False)
        
    def post(self, request):
        serializer = ComposeResearchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProposePerfumeView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = ComposeResearchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
# class getPerfumeWithName(APIView):
#     def post(self, request, *args, **kwargs):
#         current_perfume = Perfume.objects.get
class propose_perfume_edits(generics.ListCreateAPIView):
    queryset = EditedPerfume.objects.all()
    serializer_class = EditedPerfumeSerializer
    
class add_additional_sources(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SourcesSerializer(data=request.data)
        # perfume = Perfume.objects.get(id=request.data.id)
        print(request.data)
        print('request data')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetFragranceSourcesView(APIView):
    def post(self, request, *args, **kwargs):
        # perfume = Perfume.objects.get(id=request.data.id)
        current_perfume = Perfume.objects.get(id=request.data)
        print(current_perfume.proposedsources_set.all())
        print('testtt')
        if current_perfume.proposedsources_set.exists():
            serializer = GetSourcesSerializer(current_perfume.proposedsources_set.all(), many=True)
            # profile_serializer = UserProfileSerializer()
            # if serializer.is_valid():
            #     print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print('no edits found')
            return JsonResponse({'error': 'no sources found'}, status=status.HTTP_200_OK, safe=False)

class GetSourcesCountView(APIView):
    def post(self, request, *args, **kwargs):
        current_perfume = Perfume.objects.get(id=request.data)
        if current_perfume.proposedsources_set.exists():
            sources_count = current_perfume.proposedsources_set.all().count()
            return Response({'source_count': sources_count}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No sources found'}, status=status.HTTP_204_NO_CONTENT)
            
        
class RemoveSourceChecklistConfirmationView(APIView):
    def delete(self, request, *args, **kwargs):
        print(request.data)
        print('printed data from delete')
        source_id = request.data.get('source')
        user_id = request.data.get('user')
        checklist = request.data.get('checklist')
        source = get_object_or_404(ProposedSources, pk=source_id)
        match checklist:
            case "availability":
                if not source.availability_checklist.filter(pk=user_id).exists():
                    return Response(
                        {'error': 'you havent confirmed this source'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                source.availability_checklist.remove(user_id)
                return Response({"detail": "Source confirmation removed."}, status=200)
            case "year_of_release":
                if not source.year_of_release_checklist.filter(pk=user_id).exists():
                    return Response(
                        {'error': 'you havent confirmed this source'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                source.year_of_release_checklist.remove(user_id)
                return Response({"detail": "Source confirmation removed."}, status=200)
            case "notes":
                if not source.notes_checklist.filter(pk=user_id).exists():
                    return Response(
                        {'error': 'you havent confirmed this source'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                source.notes_checklist.remove(user_id)
                return Response({"detail": "Source confirmation removed."}, status=200)
            case _:
                return Response(
                    {'error': 'you did something wrong'},
                    status = status.HTTP_400_BAD_REQUEST
                )
        
class ConfirmSourceChecklist(APIView):
    def post(self, request, *args, **kwargs):
        source_id = request.data.get('source')
        user_id = request.data.get('user')
        checklist = request.data.get('checklist')
        source = get_object_or_404(ProposedSources, pk=source_id)
        match checklist:
            case "availability":
                if source.availability_checklist.filter(pk=user_id).exists():
                    return Response(
                        {'error': 'you have already confirmed this source checklist item'},
                        status = status.HTTP_400_BAD_REQUEST
                    )
                source.availability_checklist.add(user_id)
                return Response({"detail": "Source confirmed."}, status=200)
            case "year_of_release":
                if source.year_of_release_checklist.filter(pk=user_id).exists():
                    return Response(
                        {'error': 'you have already confirmed this source checklist item'},
                        status = status.HTTP_400_BAD_REQUEST
                    )
                source.year_of_release_checklist.add(user_id)
                return Response({"detail": "Source confirmed."}, status=200)
            case "notes":
                if source.notes_checklist.filter(pk=user_id).exists():
                    return Response(
                        {'error': 'you have already confirmed this source checklist item'},
                        status = status.HTTP_400_BAD_REQUEST
                    )
                source.notes_checklist.add(user_id)
                return Response({"detail": "Source confirmed."}, status=200)
            case _:
                return Response(
                {'error': 'you did something wrong'},
                status = status.HTTP_400_BAD_REQUEST
            ) 
                
class propose_discussion(APIView):
    def post(self, request, *args, **kwargs):
        serializer = DiscussionSerializer(data=request.data)
        # perfume = Perfume.objects.get(id=request.data.id)
        print(request.data)
        print('request data')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class get_perfume_discussion(APIView):
    def post(self, request, *args, **kwargs):
        current_perfume = Perfume.objects.get(id=request.data)
            
        print(current_perfume.discussion_set.all())
        print('testtt')
        if current_perfume.discussion_set.exists():
            serializer = SourcesSerializer(current_perfume.discussion_set.all(), many=True)
            # if serializer.is_valid():
            #     print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print('no edits found')
            return JsonResponse({'error': 'no edits found'}, status=status.HTTP_200_OK, safe=False)
        
    
class test_propose_perfume_edits(APIView):
    
    def post(self, request, *args, **kwargs):
        edits = EditedPerfume.objects.all()
        print(request.data)
        serializer = EditedPerfumeSerializer(data=request.data)
        if serializer.is_valid():
            print('valid')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

class ProposeProposalEdits(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = ProposeProposalEditsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostFragranceSource(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = FragranceSourceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetFragranceSources(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        current_perfume = Perfume.objects.get(pk=request.data)
        print(current_perfume)
        if current_perfume.fragrancesource_set.exists():
            serializer = RetriveSourcesSerializer(current_perfume.fragrancesource_set.all(), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print('no sources found')
            return Response({'error': 'no sources found', 'status': '400'}, status=status.HTTP_200_OK)


class check_perfume_edits_with_id(APIView):
    
        # return self.groups.filter(name="Research_Auditor").exists()
    def post(self, request, *args, **kwargs):
        # print('1')
        # print("Testtttt")
        # print(request.data)
        # print('request data')
        # print(Perfume.objects.filter(editedperfume__))
        print(request.data)
        current_perfume = Perfume.objects.get(pk=request.data)
        print(current_perfume)
        print(current_perfume.editedperfume_set.order_by('-created_at'))
        print('testtt')

            
        if current_perfume.editedperfume_set.exists():
            edited_serializer = CheckPerfumeEditsSerializer(current_perfume.editedperfume_set.all(), many=True)
            return Response(edited_serializer.data, status=status.HTTP_200_OK)
            # if serializer.is_valid():
            #     print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            print('no edits found')
            return Response({'error': 'no edits found', 'status': '400'}, status=status.HTTP_200_OK)
class check_perfume_edits_with_name(APIView):
    
        # return self.groups.filter(name="Research_Auditor").exists()
    def post(self, request, *args, **kwargs):
        # print('1')
        # print("Testtttt")
        # print(request.data)
        # print('request data')
        # print(Perfume.objects.filter(editedperfume__))
        current_perfume = Perfume.objects.get(perfume=request.data)
        
        # current_perfume = Perfume.objects.filter(perfume=request.data)
        current_edit = EditedPerfume.objects.all()
        print(current_perfume.editedperfume_set.all())
        print('testtt')
        if current_perfume.editedperfume_set.exists():
            edited_serializer = CheckPerfumeEditsSerializer(current_perfume.editedperfume_set.all(), many=True)
            original_serializer = PerfumeSerializer(Perfume.objects.filter(perfume=request.data), many=True)
            # if serializer.is_valid():
            #     print(serializer.data)
            return Response({'edited_data': edited_serializer.data, 'original_data': original_serializer.data}, status=status.HTTP_200_OK)
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            print('no edits found')
            return JsonResponse({'error': 'no edits found', 'status': '400'}, status=status.HTTP_200_OK, safe=False)
        
class ConfirmPerfume(generics.UpdateAPIView):
    perfumes = Perfume.objects.all()
    try:
        queryset = perfumes.pendingperfumes_set.all()
    except Exception as err:
        print(err)
    finally:
         queryset = perfumes
        

       
    serializer_class = PerfumeSerializer
    
    # lookup_field = 'selected_perfume'
    # def get_object(self):
    #     return Per
        
        # return super().get_object()
    
    def update(self,request,*args, **kwargs):
        instance = self.get_object()
        instance.perfume = request.data.get('perfume')
        instance.brand = request.data.get('brand')
        instance.release_data = request.data.get('release_data')
        instance.gender = request.data.get('gender')
        instance.availability = request.data.get('availability')
        instance.limited = request.data.get('limited')
        instance.varient = request.data.get('varient')
        instance.collectors = request.data.get('collectors')
        instance.interesting_facts = request.data.get('interesting_facts')
        instance.sources = request.data.get('sources')
        instance.additional_information = request.data.get('additional_information')
        instance.youtube_link = request.data.get('youtube_link')
        instance.additional_link = request.data.get('additional_link')
        instance.confirmed_by = User.objects.get(id=request.data.get('confirmed_by'))
        instance.status = request.data.get('status')
        instance.pending = None
        new_status_key = ValidParfumes.objects.get(id=1)
        instance.confirmed = new_status_key
        instance.save()
        serializer = self.get_serializer(data=instance)
        if (serializer.is_valid()):
            
            self.perform_update(serializer)
            return Response(serializer.data)
        else:
            return Response({"Not Found": "Sorry "})
        # instance.status_key = 
        # if not user.groups.filter(name='Research_Auditor').exists():
        #     print("No permission")
        #     return JsonResponse({'status': "404"}, status=status.HTTP_404_NOT_FOUND, safe=False)
            # return AuthenticationResponse(request)
        # else:
        #     print("has permission=")
        #     return JsonResponse({'status': "200"}, status=status.HTTP_200_OK, safe=False)
# class propose_perfume_edits(APIView):
    
#     # def get(self, request):
#     #     perfumes = TestPerfume.objects.all()
#     #     serializer = ComposeResearchSerializer(perfumes, many=True)
#     #     # return HttpResponse(serializer.data, )
#     #     return JsonResponse(serializer.data, safe=False)
#     def post(self, request):
#         serializer = EditedPerfumeSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
# class get_pending_proposals(APIView):
    
#     def get(self, request):
#         pending_proposals = PendingPerfumes.objects.get(id=1)
#         # perfumes = Perfume.objects.all()
#         # test = Perfume.objects.select_related('status_key').get(id=1)
#         testt = Perfume.objects.select_related('status_key').all()
#         print(testt)
#         # print(test)
#         # print("pritned test")
#         serializer = PendingPerfumeSerializer(testt, many=True)
#         count = Perfume.objects.select_related('status_key').all().count()
#         print(serializer.data)
#         print('printed')
#         # serializer.data['status'] = {'status': '200'}
#         return Response({'status': '200', 'data': serializer.data, 'count': count}, status=status.HTTP_200_OK)

class test_pending_proposals(generics.RetrieveUpdateDestroyAPIView):
    queryset = Perfume.objects.select_related('pending').all()
    serializer_class = PendingPerfumeSerializer

    
class test_pending_proposals_details(generics.ListCreateAPIView):
    queryset = Perfume.objects.select_related('pending').all()
    serializer_class = PendingPerfumeSerializer
    # def get_queryset(self):
    #     perfume = Perfume.objects.select_related('status_key').all()
    #     return perfume

    # def get(self, request, *args, **kwargs):
    #     qs = self.get_queryset()
    #     page = self.paginate_queryset(qs)
    #     return self.get_paginated_response(page)
# class hmm(generics.)
    
