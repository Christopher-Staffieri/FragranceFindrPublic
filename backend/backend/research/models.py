from django.db import models
from ..accounts.models import User
from ..database.models import Perfume
from datetime import datetime
from django.contrib.postgres.fields import ArrayField

class ProposedSources(models.Model):
    info = models.TextField(blank=True, null=True)
    tags = ArrayField(models.CharField(max_length=500,blank=True), blank=True, null=True)
    source_url = models.CharField(blank=True, null=True)
    date_posted = models.DateTimeField(auto_now_add=True)
    selected_perfume = models.ForeignKey(Perfume, null=True, blank=True, on_delete=models.PROTECT)
    notes_checklist = models.ManyToManyField(User, related_name='verified_notes', blank=True)
    year_of_release_checklist = models.ManyToManyField(User, related_name='verified_year', blank=True)
    availability_checklist = models.ManyToManyField(User, related_name='verified_availability', blank=True)
    posted_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.PROTECT)
    
    
class Discussion(models.Model):
    post = models.TextField(blank=True, null=True)
    date_posted = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    posted_by = models.OneToOneField(User, null=True, blank=True, on_delete=models.PROTECT)
    selected_perfume = models.ForeignKey(Perfume, null=True, blank=True, on_delete=models.PROTECT)

