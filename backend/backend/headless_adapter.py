from allauth.headless.adapter import DefaultHeadlessAdapter
from typing import Any, Dict

from django.forms.fields import Field

from allauth.account.models import EmailAddress
from .accounts.models import User
from allauth.account.utils import user_display, user_username
from allauth.core.internal.adapter import BaseAdapter
from allauth.headless import app_settings
from allauth.utils import import_attribute
from .profiles.serializers import UserProfileSerializer

class CustomHeadlessAdapter(DefaultHeadlessAdapter):
    
    def serialize_user(self, user) -> Dict[str, Any]:
        """
        Returns the basic user data. Note that this data is also exposed in
        partly authenticated scenario's (e.g. password reset, email
        verification).
        """
        ret = {
            "id": user.pk,
            "display": user_display(user),
            "has_usable_password": user.has_usable_password(),
        }
        email = EmailAddress.objects.get_primary_email(user)
        if email:
            ret["email"] = email
        username = user_username(user)
        if username:
            ret["username"] = username
        try:
            user_profile = user.userprofile
            if user_profile:
                ret["profile"] = user_profile.id
        except Exception as error:
            pass
        try:
            user_collection = user.usercollection
            if user_collection:
                ret['user_collection'] = user_collection.id
        except Exception as error:
            print(error)
            pass
        return ret