from rest_framework import serializers
# from .models import ComposedResearch
from ..database.models import TestPerfume

from ..accounts.models import User, UserProfile
from .models import ProposedSources, Discussion
from ..profiles.serializers import UserProfileSerializer

from ..database.models import (
    Perfume,
    PendingPerfumes,
    EditedPerfume,
    Perfumer,
    BottleDesigner,
)



from backend.common.serializers import (
    BrandSerializer,
    PerfumerSerializer,
    ParentCompanySerializer,
    BottleDesignerSerializer,
    FragranceCollectionSerializer,
)
        

     
class DiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discussion
        fields = "__all__"   
        
class PerfumeSerializer(serializers.ModelSerializer):
    # is_subscribed = serializers.SerializerMethodField()
    
    class Meta:
        model = Perfume
        fields = "__all__"  
    
        
class GetPendingProposalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingPerfumes
        fields = "__all__"
        
class ComposeResearchSerializer(serializers.ModelSerializer):
    # status_key = GetPendingProposalsSerializer
    perfumers = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Perfumer.objects.all()
    )
    bottle_designer = serializers.PrimaryKeyRelatedField(
        many=True, queryset=BottleDesigner.objects.all()
    )
    notes = serializers.JSONField(required=True)
    class Meta:
        model = Perfume
        fields = "__all__"
        
#   Need to add a middleware here to ensure the user that is submitting this is an auditor or manager      
class ProposeProposalEditsSerializer(serializers.ModelSerializer):
    # status_key = GetPendingProposalsSerializer
    perfumers = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Perfumer.objects.all()
    )
    bottle_designer = serializers.PrimaryKeyRelatedField(
        many=True, queryset=BottleDesigner.objects.all()
    )
    notes = serializers.JSONField(required=True)
    class Meta:
        model = EditedPerfume
        fields = "__all__"
        
        
class PendingPerfumeSerializer(serializers.ModelSerializer):
    status_key = GetPendingProposalsSerializer( read_only=True)
    class Meta:
        model = Perfume
        fields = "__all__"
        # depth = 1]
        
class ConfirmedBySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class EditedBySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'id'] 

class GetCurrentPerfumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfume
        fields = "__all__"

        
class EditedPerfumeSerializer(serializers.ModelSerializer):
    selected_perfume = GetCurrentPerfumeSerializer(read_only = True)
    edited_by = EditedBySerializer(read_only=True)
    class Meta:
        model = EditedPerfume
        fields = "__all__"
        
        

class EditedByProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'id']
        
class CheckPerfumeEditsSerializer(serializers.ModelSerializer):
    selected_perfume = PerfumeSerializer(read_only=True)
    confirmed_by = ConfirmedBySerializer(read_only=True)
    edited_by = EditedByProfileSerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    parent_company = ParentCompanySerializer(read_only=True)
    perfumers = PerfumerSerializer(many=True, read_only=True)
    bottle_designer = BottleDesignerSerializer(many=True, read_only=True)
    fragrance_collection = FragranceCollectionSerializer(read_only=True)
    class Meta:
        model = EditedPerfume
        fields = "__all__"
        
class SourcesSerializer(serializers.ModelSerializer):
    selected_perfume = serializers.PrimaryKeyRelatedField(queryset=Perfume.objects.all())
    posted_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    notes_checklist = EditedByProfileSerializer(read_only=True, many=True)
    year_of_release_checklist = EditedByProfileSerializer(read_only=True, many=True)
    availability_checklist = EditedByProfileSerializer(read_only=True, many=True)
    class Meta:
        model = ProposedSources
        fields = "__all__" 
        
class GetSourcesSerializer(serializers.ModelSerializer):
    selected_perfume = PerfumeSerializer(read_only=True)
    posted_by = ConfirmedBySerializer()
    notes_checklist = EditedByProfileSerializer(read_only=True, many=True)
    year_of_release_checklist = EditedByProfileSerializer(read_only=True, many=True)
    availability_checklist = EditedByProfileSerializer(read_only=True, many=True)
    class Meta:
        model = ProposedSources
        fields = "__all__" 
        
class DiscussionSerializer(serializers.ModelSerializer):
    posted_by = EditedByProfileSerializer(read_only=True)
    class Meta:
        model = Discussion
        fields = "__all__"
        
# class CheckPerfumeEditsSerializer(serializers.ModelSerializer):
#     selected_perfume = PerfumeSerializer(read_only=True)
#     confirmed_by = ConfirmedBySerializer(read_only=True)
#     edited_by = EditedByProfileSerializer(read_only=True)
#     class Meta:
#         model = EditedPerfume
#         fields = "__all__"
