from django import forms


class CustomSignupForm(forms.Form):
    def signup(self, request, user):
        gender = forms.CharField()
        country = forms.CharField()
        first_name = forms.CharField()
        last_name = forms.CharField()
    #      password = inputs.CharField()
    # gender = inputs.CharField()
    # country = inputs.CharField()
    # first_name = inputs.CharField()
    # last_name = inputs.CharField()