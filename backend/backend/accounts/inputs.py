from allauth.headless.internal.restkit import inputs
from allauth.account import app_settings as account_settings
from allauth.account.adapter import get_adapter as get_account_adapter
from allauth.account.forms import (
    BaseSignupForm,
   
)
from django_countries.fields import CountryField

class SignupInput(BaseSignupForm, inputs.Input):
    password = inputs.CharField()
    gender = inputs.CharField()
    country = inputs.CharField()
    first_name = inputs.CharField()
    last_name = inputs.CharField()
    
    def __init__(self, *args, **kwargs):
       super().__init__(*args, **kwargs)
       password = account_settings.SIGNUP_FIELDS.get("password1")
       if not password:
           del self.fields["password"]
       else:
           self.fields["password"].required = password["required"]

    def clean_password(self):
        password = self.cleaned_data["password"]
        return get_account_adapter().clean_password(password)
    
    