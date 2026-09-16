from django.db.models.signals import post_save
from django.dispatch import receiver
from ..accounts.models import User, UserProfile
from allauth.account.signals import user_signed_up
# post_save, sender=User

# sender, instance, created,
# @receiver(user_signed_up, dispatch_uid="create_user_profile")
# def create_user_profile(sender, request, user, **kwargs):
#     print('ran create signasl')
#     try:
#         # selected_user = User.objects.get(email=user)
#         # if not UserProfile.objects.filter(user=user).exists():
#         #     pass
#         print(user)
#             # user_profile = UserProfile.objects.create(user=selected_user)
#             # user_profile.save()
#     except Exception as error:
#         print(error)
        
    # if user:
    # #     print(instance)
    #     profile = UserProfile.objects.create(user=User.objects.get(email=user))
    #     profile.save()
# @receiver(user_signed_up)
# def save_user_profile(request, user, **kwargs):
#     print(request)
#     print(user)
#     print('ran save_user')
    # instance.userprofile.save()
    
    