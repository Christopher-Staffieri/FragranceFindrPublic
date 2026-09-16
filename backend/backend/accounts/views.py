from django.utils.decorators import method_decorator
from django.http.response import JsonResponse, HttpResponse

from rest_framework import status
from rest_framework.response import Response

from allauth.headless.base.response import AuthenticationResponse
from allauth.decorators import rate_limit
from allauth.account.utils import complete_signup
from allauth.account.internal import flows
from allauth.core.exceptions import ImmediateHttpResponse
from allauth.account.adapter import get_adapter as get_account_adapter
from allauth.headless.base.views import (
    AuthenticatedAPIView,
    APIView,
)
from allauth.headless.base.response import (
    ForbiddenResponse,
    ConflictResponse,
)

from .inputs import SignupInput
from ..accounts.models import User, UserProfile
from ..research.serializers import EditedBySerializer

    
@method_decorator(rate_limit(action="signup"), name="handle")
class SignupView(APIView):
    input_class = {"POST": SignupInput}
    by_passkey = False

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return ConflictResponse(request)
        if not get_account_adapter().is_open_for_signup(request):
            return ForbiddenResponse(request)
        user, resp = self.input.try_save(request)
        if not resp:
            try:
                resp = flows.signup.complete_signup(
                    request, user=user, by_passkey=self.by_passkey
                )
            except ImmediateHttpResponse:
                pass
        return AuthenticationResponse.from_response(request, resp)
    
class is_research_auditor(AuthenticatedAPIView):
    def get(self, request, *args, **kwargs):
        pass
        # return self.groups.filter(name="Research_Auditor").exists()
    def post(self, request, *args, **kwargs):
        # print('1')
        # print("Testtttt")
        user = User.objects.get(id=request.user.id)
        if not user.groups.filter(name='ResearchAuditor').exists():
            print("No permission")
            return JsonResponse({'status': "404"}, status=status.HTTP_404_NOT_FOUND, safe=False)
            # return AuthenticationResponse(request)
        else:
            print("has permission=")
            return JsonResponse({'status': "200"}, status=status.HTTP_200_OK, safe=False)
        
class is_research_manager(AuthenticatedAPIView):
  
    def post(self, request, *args, **kwargs):

        user = User.objects.get(id=request.user.id)
        if not user.groups.filter(name='Research_Manager').exists():
            print("No permission")
            return JsonResponse({'status': "404"}, status=status.HTTP_404_NOT_FOUND, safe=False)
            # return AuthenticationResponse(request)
        else:
            print("has permission=")
            return JsonResponse({'status': "200"}, status=status.HTTP_200_OK, safe=False)


        # print(User.objects.get(id=1).groups)
        # # print(User.objects.get(id=request.user.id))
        # # group = Group.objects.get(name="Research_Auditor") 
        # print(Group.objects.get(name="Research_Auditor"))
        # print(User.objects.filter(groups__name='Research_Auditor').exists())
        
    

