

from django.db import models
from ..accounts.models import UserProfile

class ProfileBadge(models.Model):
    name = models.CharField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    user = models.ForeignKey(UserProfile, null=True, blank=True, on_delete=models.PROTECT)
    
