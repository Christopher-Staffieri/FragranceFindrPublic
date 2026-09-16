
from rest_framework import serializers

from backend.database.models import ParentCompany, UserCollection, CustomCollection, Rating, Reviews, Statements, FragranceClassification
from backend.database.models import (
    ParentCompany,
    UserCollection,
    CustomCollection,
    Rating,
    Reviews,
    Statements,
    FragranceClassification,
    NoteCategory,
    FragranceNote,
    Brand, 
    Perfumer,
    FragranceCollection,
    BottleDesigner,
)
from ..research.serializers import PerfumeSerializer, EditedBySerializer, EditedByProfileSerializer
from ..accounts.models import UserProfile, User
from ..database.models import Perfume
from ..profiles.serializers import UserProfileSerializer
from django_countries.serializer_fields import CountryField
from backend.common.serializers import (
    BrandSerializer,
    BottleDesignerSerializer,
    PerfumerSerializer,
    ParentCompanySerializer,
    FragranceCollectionSerializer,
)


class RetrieveParentCompanySerializer(serializers.ModelSerializer):
    # status_key = GetPendingProposalsSerializer( read_only=True)
    class Meta:
        model = ParentCompany
        fields = "__all__"
        # depth = 1
        

        
class UserCollectionSerializer(serializers.ModelSerializer):
    currently_own = PerfumeSerializer(read_only=True, many=True)
    owned_before =  PerfumeSerializer(read_only=True, many=True)
    wish_list = PerfumeSerializer(read_only=True, many=True)
    watching = PerfumeSerializer(read_only=True, many=True)
    tested = PerfumeSerializer(read_only=True, many=True)
    decants = PerfumeSerializer(read_only=True, many=True)
    user = EditedBySerializer(read_only=True)
    class Meta:
        model = UserCollection
        fields = "__all__"
        
class PerfumeDBSerializer(serializers.ModelSerializer):
    proposed_by = UserProfileSerializer(read_only=True)
    confirmed_by = UserProfileSerializer(read_only=True)
    rejected_by = UserProfileSerializer(read_only=True)
    bottle_designer = BottleDesignerSerializer(read_only=True)
    parent_company = ParentCompanySerializer(read_only=True)
    class Meta:
        model = Perfume
        fields = "__all__"

class LatestDBPerfumeSerializer(serializers.ModelSerializer):
    proposed_by = EditedBySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    class Meta:
        model = Perfume
        fields = ["perfume", "perfume_image", "brand", "release_year", "proposed_by", "views"]
        
class FragranceProposalSerializer(serializers.ModelSerializer):
    proposed_by = EditedBySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    confirmed_by = UserProfileSerializer(read_only=True)
    rejected_by = UserProfileSerializer(read_only=True)
    bottle_designer = BottleDesignerSerializer(many=True, read_only=True)
    parent_company = ParentCompanySerializer(read_only=True)
    fragrance_collection = FragranceCollectionSerializer(read_only=True)
    perfumers = PerfumerSerializer(many=True, read_only=True)
    class Meta:
        model = Perfume
        fields = "__all__"
        
# class CustomCollectionSerializer(serializers.ModelSerializer):
#     user_collection = UserCollectionSerializer()
#     class Meta:
#         model = CustomCollection
#         fields = "__all__" 

        
class CreateCollectionSerializer(serializers.ModelSerializer):
    # rated_by = EditedBySerializer()
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = UserCollection
        fields = "__all__" 
        
class PostRatingSerializer(serializers.ModelSerializer):
    # rated_by = EditedBySerializer()
    rated_by = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())
    # rated_perfume = PerfumeSerializer()
    rated_perfume = serializers.PrimaryKeyRelatedField(queryset=Perfume.objects.all())
    class Meta:
        model = Rating
        fields = "__all__" 
        
class RatingSerializer(serializers.ModelSerializer):
    rated_by = UserProfileSerializer(read_only=True)
    rated_perfume = PerfumeSerializer(read_only=True)
    class Meta:
        model= Rating
        fields = "__all__" 

class ReviewSerializer(serializers.ModelSerializer):
    posted_by = UserProfileSerializer(read_only=True)
    reviewed_perfume = PerfumeSerializer(read_only=True)
    up_votes = UserProfileSerializer(read_only=True, many=True)
    down_votes = UserProfileSerializer(read_only=True, many=True)
    awards = UserProfileSerializer(read_only=True, many=True)
    class Meta:
        model=Reviews
        fields='__all__'
        

class PostReviewSerializer(serializers.ModelSerializer):
    # rated_by = EditedBySerializer()
    posted_by = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())
    # rated_perfume = PerfumeSerializer()
    reviewed_perfume = serializers.PrimaryKeyRelatedField(queryset=Perfume.objects.all())
    class Meta:
        model = Reviews
        fields = "__all__" 
        
class StatementSerializer(serializers.ModelSerializer):
    posted_by = UserProfileSerializer(read_only=True)
    statement_perfume = PerfumeSerializer(read_only=True)
    awards = UserProfileSerializer(read_only=True, many=True)
    class Meta:
        model=Statements
        fields='__all__'
        
class PostStatementSerializer(serializers.ModelSerializer):
    # rated_by = EditedBySerializer()
    posted_by = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())
    # rated_perfume = PerfumeSerializer()
    statement_perfume = serializers.PrimaryKeyRelatedField(queryset=Perfume.objects.all())
    class Meta:
        model = Statements
        fields = "__all__"


        
class CustomCollectionSerializer(serializers.ModelSerializer):
    perfumes = PerfumeSerializer(read_only=True, many=True)
    user_collection = UserCollectionSerializer(read_only=True)
    class Meta:
        model = CustomCollection
        fields = "__all__"

class PostCustomCollectionSerializer(serializers.ModelSerializer):
    # rated_by = EditedBySerializer()
    user_collection = serializers.PrimaryKeyRelatedField(queryset=UserCollection.objects.all())
    perfumes = serializers.PrimaryKeyRelatedField(queryset=Perfume.objects.all(), many=True, required=False)
    class Meta:
        model = CustomCollection
        fields = "__all__"
        
class FragranceClassificationSerializer(serializers.ModelSerializer):
    user = EditedByProfileSerializer(read_only=True)
    perfume = PerfumeSerializer(read_only=True)
    class Meta:
        model = FragranceClassification
        fields = "__all__"

class PostPerfumeClassificationSerializer(serializers.ModelSerializer):
    # rated_by = EditedBySerializer()
    user = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())
    # rated_perfume = PerfumeSerializer()
    perfume = serializers.PrimaryKeyRelatedField(queryset=Perfume.objects.all())
    class Meta:
        model = FragranceClassification
        fields = "__all__"
        
class PostFragranceNoteSerializer(serializers.ModelSerializer):
    # rated_by = EditedBySerializer()
    category = serializers.PrimaryKeyRelatedField(queryset=NoteCategory.objects.all())
    proposed_by = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())
    class Meta:
        model = FragranceNote
        fields = "__all__"