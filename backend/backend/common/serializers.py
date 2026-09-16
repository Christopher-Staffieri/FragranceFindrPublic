from rest_framework import serializers
from django_countries.serializer_fields import CountryField
from backend.database.models import (
    ParentCompany,
    Brand, 
    Perfumer,
    BottleDesigner,
    FragranceCollection, 
    FragranceSource
)

from backend.profiles.serializers import UserProfileSerializer

class ParentCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ParentCompany
        fields = '__all__'
    
class FragranceSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FragranceSource
        fields = '__all__'

class RetriveSourcesSerializer(serializers.ModelSerializer):
    posted_by = UserProfileSerializer(read_only=True, many=True)
    class Meta:
        model = FragranceSource
        fields = '__all__'
        
class BrandSerializer(serializers.ModelSerializer):
    parentCompany = ParentCompanySerializer(read_only=True)
    country = CountryField()
    class Meta:
        model = Brand
        fields = '__all__'
        
class PerfumerSerializer(serializers.ModelSerializer):
    company = BrandSerializer(read_only=True)
    class Meta:
        model = Perfumer
        fields = '__all__'
        
class BottleDesignerSerializer(serializers.ModelSerializer):
    class Meta:
        model = BottleDesigner
        fields = '__all__'
        
class FragranceCollectionSerializer(serializers.ModelSerializer):
    company = BrandSerializer(read_only=True)
    class Meta:
        model = FragranceCollection
        fields = '__all__'