from django.contrib.auth.models import AbstractUser
# from django.contrib.auth.models import UserManager
from .managers import UserManager

from django.db.models import EmailField
from django.db.models import CharField
from django.db.models import DateField
from django.db.models import DateTimeField
from django.db.models import Field
from django.db import models
from django_countries.fields import CountryField
from django.utils.translation import gettext_lazy as _
from ..profiles.level_thresholds import level_thresholds


class User(AbstractUser):
    """CustomUser model"""
    gender = CharField(_("gender"), blank=True)
    # first_name = CharField(_("first_name"), blank=True)
    # last_name = CharField(_("last_name"), blank=True)
    email = EmailField(_("email address"), unique=True)
    birth_date = DateField(_('birth date'), blank=True, null=True)
    username = CharField(_("username"), blank=True, max_length=16)  # type: ignore[assignment]
    country = CountryField(blank_label='(select country)',  blank=True, null=True)
    # last_login = DateTimeField(_("last login"))
    # gender = CharField(_("gender"), blank=True)
    # gender = CharField(_("gender"), blank=True)
    
    # country = CountryField(blank_label='(select country)',  blank=True, null=True)
    # is_admin = models.BooleanField(default=False,  blank=True, null=True)
    # online_status = models.BooleanField(default=False, blank=True, null=True)  # True for online, False for offline

    USERNAME_FIELD = 'email'  # Use email to log in
    # 'birth_date', 'country'
    REQUIRED_FIELDS = ['username','gender', 'first_name', 'last_name', 'birth_date', 'country']  # 'email' is required by default

    objects = UserManager()

    def __str__(self):
        return self.email
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    profile_picture = models.ImageField(null=True, blank=True, default='default_pfp.pfp.png')
    last_profile_picture_change = models.DateField(null=True, blank=True)
    
    def add_points(self, points):
        self.points += points
        self.level_up()
    def level_up(self):
        for i, threshold in enumerate(level_thresholds, start=1):
            if self.points >= threshold:
                self.level = i + 1
            else:
                break
            
    