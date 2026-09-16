from django.db import models
from ..accounts.models import User, UserProfile
from django_countries.fields import CountryField
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator
# from ..research.models import Discussion
import datetime 
class ValidParfumes(models.Model):
    name = models.CharField()
    
class InvalidParfumes(models.Model):
    name = models.CharField()

class PendingPerfumes(models.Model):
    name = models.CharField()
    
class TestPerfume(models.Model):
    name = models.CharField(max_length=40)
    status_key = models.ForeignKey(PendingPerfumes, on_delete=models.PROTECT, null=True, blank=True)
    
class ParentCompany(models.Model):
    name = models.CharField(max_length=100)
    company_image = models.CharField(null=True, blank=True)
    parent_company_website = models.URLField(max_length=200, null=True, blank=True)
    
class Brand(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=300, null=True, blank=True)
    # houseIMG = models.ImageField()
    houseWebsite = models.URLField(max_length=200, null=True, blank=True) 
    parentCompany = models.ForeignKey(ParentCompany, on_delete=models.PROTECT, null=True, blank=True)
    country = CountryField()
    
class NoteCategory(models.Model):
    category = models.CharField(blank=True, null=True)
    
class FragranceNote(models.Model):
    note = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=100, null=True, blank=True)
    category = models.ForeignKey(NoteCategory, on_delete=models.PROTECT, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(null=True, blank=True)
    proposed_by = models.OneToOneField(UserProfile, on_delete=models.PROTECT, related_name='+', blank=True, null=True)
    
class FragranceCollection(models.Model):
    name = models.CharField(max_length=40, blank=True, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT, null=True, blank=True)   
    
class Perfumer(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    perfumer_image = models.ImageField(null=True, blank=True)
    company = models.ForeignKey(Brand, on_delete=models.PROTECT, null=True, blank=True)

class BottleDesigner(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    designer_image = models.ImageField(null=True, blank=True)
    

    
class Perfume(models.Model):
    perfume = models.CharField(max_length=40)
    views = models.IntegerField(default=0)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT, null=True, blank=True)
    brand_other = models.CharField(max_length=40, null=True, blank=True)
    perfume_image = models.ImageField(null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    fragrance_collection = models.ForeignKey(FragranceCollection, on_delete=models.PROTECT, null=True, blank=True)
    fragrance_collection_other = models.CharField(max_length=80, null=True, blank=True)
    parent_company = models.ForeignKey(ParentCompany, on_delete=models.PROTECT, null=True, blank=True)
    parent_company_other = models.CharField(max_length=40, null=True, blank=True)
    bottle_designer = models.ManyToManyField(BottleDesigner, blank=True)
    bottle_designer_other =ArrayField(models.CharField(max_length=500,blank=True), blank=True, null=True)
    # bottle_designer_other = models.CharField(max_length=40, null=True, blank=True)
    # perfumers = ArrayField(models.CharField(max_length=500,blank=True), blank=True, null=True)
    perfumers = models.ManyToManyField(Perfumer, blank=True)
    perfumers_other = ArrayField(models.CharField(max_length=500,blank=True), blank=True, null=True)
    # Will be linked to parent company model (if parent company isnt a thing )
    notes = models.JSONField(default=dict, blank=True)
    release_year = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1900),
            MaxValueValidator(2100)
        ],
        null=True,
        blank=True
    )
    gender = models.CharField(max_length=15,blank=True, null=True)
    availability = models.BooleanField(blank=True, null=True)
    is_limited = models.BooleanField(blank=True, null=True)
    limited_original_perfume = models.CharField(blank=True, null=True, max_length=80)
    # if VARIANT OF THE FRAGRANCE CONCENTRATION Or COLLECTOR'S BOTTLE selected fill out the original parfume cat with a forign key
    is_varient = models.BooleanField(blank=True, null=True)
    varient_original_perfume = models.CharField(max_length=80, null=True, blank=True)
    is_collectors = models.BooleanField(blank=True, null=True)
    collectors_original_perfume = models.CharField(max_length=80, null=True, blank=True)
    interesting_facts = models.TextField(blank=True, null=True)
    additional_information = models.TextField(blank=True, null=True)
    youtube_link = models.URLField(max_length=200, blank=True, null=True) 
    additional_link = models.URLField(max_length=200, blank=True, null=True)

    proposed_by = models.ForeignKey(User, on_delete=models.PROTECT, default=1)
    confirmed_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='+', blank=True, null=True)
    rejected_by = models.OneToOneField(User, on_delete=models.PROTECT, related_name='+', blank=True, null=True)
    # Will be used in order to check if the model is valid invalid or accepted and add the corresponding field
    status = models.CharField(blank=True, null=True)
    # discussion = models.ForeignKey(Discussion, blank=True, null=True, on_delete=models.PROTECT)
    pending = models.ForeignKey(PendingPerfumes, on_delete=models.PROTECT, null=True, blank=True)
    confirmed = models.ForeignKey(ValidParfumes,  on_delete=models.PROTECT, null=True, blank=True)
    rejected = models.ForeignKey(InvalidParfumes, on_delete=models.PROTECT, null=True, blank=True)
    review_subscribers = models.ManyToManyField(UserProfile, related_name='review_subscribers', blank=True)
    statement_subscribers = models.ManyToManyField(UserProfile, related_name='statement_subscribers', blank=True)
    photo_subscribers = models.ManyToManyField(UserProfile, related_name='photo_subscribers', blank=True)
    date_posted = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    
    # classifications = models.ForeignKey(FragranceClassification, on_delete=models.PROTECT, null=True, blank=True)
    # Need to add the date the perfume was proposed
    # Need to add 
    
class FragranceSource(models.Model):
    source = models.CharField(max_length=400, null=True, blank=True)
    posted_by = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True)
    perfume = models.ForeignKey(Perfume, on_delete=models.PROTECT, null=True, blank=True)
    
class EditedPerfume(models.Model):
    selected_perfume = models.ForeignKey(Perfume, on_delete=models.PROTECT, blank=True, null=True)
    perfume = models.CharField(max_length=40, blank=True, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT, null=True, blank=True)
    brand_other = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    fragrance_collection = models.ForeignKey(FragranceCollection, on_delete=models.PROTECT, null=True, blank=True)
    fragrance_collection_other = models.CharField(max_length=80, null=True, blank=True)
    parent_company = models.ForeignKey(ParentCompany, on_delete=models.PROTECT, null=True, blank=True)
    parent_company_other = models.CharField(max_length=40, null=True, blank=True)
    bottle_designer = models.ManyToManyField(BottleDesigner, blank=True)
    bottle_designer_other =ArrayField(models.CharField(max_length=500,blank=True), blank=True, null=True)
    perfumers = models.ManyToManyField(Perfumer, blank=True)
    perfumers_other = ArrayField(models.CharField(max_length=500,blank=True), blank=True, null=True)
    notes = models.JSONField(default=dict, blank=True)
    release_year = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1900),
            MaxValueValidator(2100)
        ],
        null=True,
        blank=True
    )
    gender = models.CharField(max_length=15,blank=True, null=True)
    availability = models.BooleanField(blank=True, null=True)
    is_limited = models.BooleanField(blank=True, null=True)
    limited_original_perfume = models.CharField(blank=True, null=True, max_length=80)
    is_varient = models.BooleanField(blank=True, null=True)
    varient_original_perfume = models.CharField(max_length=80, null=True, blank=True)
    is_collectors = models.BooleanField(blank=True, null=True)
    collectors_original_perfume = models.CharField(max_length=80, null=True, blank=True)
    interesting_facts = models.TextField(blank=True, null=True)
    sources = models.CharField(blank=True, null=True)
    additional_information = models.TextField(blank=True, null=True)
    youtube_link = models.URLField(max_length=200, blank=True, null=True) 
    additional_link = models.URLField(max_length=200, blank=True, null=True)
    edited_by = models.ForeignKey(User, blank=True, null=True, on_delete=models.PROTECT)
    status = models.CharField(blank=True, null=True)
    confirmed_by = models.OneToOneField(User, on_delete=models.PROTECT, related_name='+', blank=True, null=True)
    rejected_by = models.OneToOneField(User, on_delete=models.PROTECT, related_name='+', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # edited_gender = models.CharField(max_length=15, blank=True, null=True)
    # edited_availability = models.CharField(blank=True, null=True)
    # edited_limited = models.BooleanField(blank=True, null=True)
    # # if VARIANT OF THE FRAGRANCE CONCENTRATION Or COLLECTOR'S BOTTLE selected fill out the original parfume cat with a forign key
    # edited_varient = models.BooleanField(blank=True, null=True)
    # edited_collectors = models.BooleanField(blank=True, null=True)
    # # Link to collections model
    # # collections = models.ForeignKey()
    # edited_interesting_facts = models.TextField(blank=True, null=True)
    # edited_sources = models.CharField(blank=True, null=True)
    # edited_additional_information = models.TextField(blank=True, null=True)
    # edited_youtube_link = models.CharField(blank=True, null=True) 
    # edited_additional_link = models.CharField(blank=True, null=True)
    # edited_by = models.OneToOneField(User, blank=True, default=2, null=True, on_delete=models.PROTECT)
    # confirmed_by = models.OneToOneField(User, on_delete=models.PROTECT, related_name='+', blank=True, null=True)
    # rejected_by = models.OneToOneField(User, on_delete=models.PROTECT, related_name='+', blank=True, null=True)
    # # Will be used in order to check if the model is valid invalid or accepted and add the corresponding field
    edited_status = models.CharField(blank=True, null=True)
    
class FragranceClassification(models.Model):
    occasion =  ArrayField(models.CharField(max_length=500,blank=True), blank=True, null=True)
    season = ArrayField(models.CharField(max_length=500,blank=True), blank=True, null=True)
    style = ArrayField(models.CharField(max_length=500,blank=True), blank=True, null=True)
    type = ArrayField(models.CharField(max_length=500,blank=True), blank=True, null=True)
    user = models.ForeignKey(UserProfile, null=True, blank=True, on_delete=models.PROTECT)
    perfume = models.OneToOneField(Perfume, null=True, blank=True, on_delete=models.PROTECT)


class Rating(models.Model):
    scent_rating = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True,)
    sillage_rating = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True,)
    longevity_rating = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True,)
    bottle_rating = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True,)
    price_rating = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True,)
    time_rated = models.DateTimeField(auto_now_add=True)
    rated_by = models.ForeignKey(UserProfile, null=True, blank=True, on_delete=models.PROTECT)
    rated_perfume = models.OneToOneField(Perfume, null=True, blank=True, on_delete=models.PROTECT)
    
class Reviews(models.Model):
    title = models.CharField()
    review = models.TextField(blank=True, null=True)
    scent_associations = ArrayField(models.CharField(20), blank=True, null=True)
    up_votes = models.ManyToManyField(UserProfile, blank=True, related_name='+')
    down_votes = models.ManyToManyField(UserProfile, blank=True, related_name='+')
    awards = models.ManyToManyField(UserProfile, blank=True, related_name='+')
    date_posted = models.DateField(auto_now_add=True)
    posted_by = models.ForeignKey(UserProfile, null=True, blank=True, on_delete=models.PROTECT, related_name='+')
    reviewed_perfume = models.ForeignKey(Perfume, null=True, blank=True, on_delete=models.PROTECT)

class Statements(models.Model):
    statement = models.TextField(blank=True, null=True)
    scent_associations = ArrayField(models.CharField(20), blank=True, null=True)
    awards = models.ManyToManyField(UserProfile, blank=True, related_name='+')
    date_posted = models.DateField(auto_now_add=True)
    posted_by = models.ForeignKey(UserProfile, null=True, blank=True, on_delete=models.PROTECT, related_name='+')
    statement_perfume = models.ForeignKey(Perfume, null=True, blank=True, on_delete=models.PROTECT)
# class CollectionItem(models.Model):
    
    
# class Collections(models.Model):
#     collection_name = models.CharField()

    
class UserCollection(models.Model):
    currently_own = models.ManyToManyField(Perfume, blank=True, related_name='currently_own')
    owned_before =  models.ManyToManyField(Perfume, blank=True, related_name='owned_before' )
    wish_list = models.ManyToManyField(Perfume, blank=True, related_name='wish_list')
    watching = models.ManyToManyField(Perfume, blank=True, related_name='watching')
    tested = models.ManyToManyField(Perfume, blank=True, related_name='tested')
    decants = models.ManyToManyField(Perfume, blank=True, related_name='decants')
    # collection_icon = models.ImageField(null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.PROTECT)

class CustomCollection(models.Model):
    collection_name = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(max_length=200, blank=True, null=True)
    perfumes = models.ManyToManyField(Perfume, blank=True, related_name='perfumes')
    collection_icon = models.ImageField(null=True, blank=True)
    user_collection = models.ForeignKey(UserCollection, on_delete=models.PROTECT)
    
    
    
# Goes into parfume or whatever I choose to do
# status = models.ForeignKey(Status(pending, valid or invalid), on_delete=)