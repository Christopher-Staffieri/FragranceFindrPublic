from django.contrib import admin
from django.urls import include, path
# from .accounts import views
from .accounts.views import (
    is_research_auditor,
    is_research_manager,
    SignupView,
)
from .research.views import (
    propose_discussion,
    test_compose,
    test_pending_proposals,
    test_pending_proposals_details,
    propose_perfume_edits,
    check_perfume_edits_with_id,
    check_perfume_edits_with_name,
    test_propose_perfume_edits,
    ConfirmPerfume,
    add_additional_sources,
    ProposePerfumeView,

)
from .database.views import (
    UpdatePerfumeRating,
    test_parent_companies_detail,
    test_parent_companies,
    PerfumeAutocompleteView,
    PerfumeView,
    CreateUserCollectionView,
    CreatePerfumeRatingView,
    # GetPerfumeRatings,
    CheckUserRating,
    CheckUserPerfumeReview,
    CreatePerfumeReviewView,
    UpdatePerfumeReview,
    CheckUserPerfumeStatements,
    CreatePerfumeStatementView,
    UpdatePerfumeStatement,
    UpdateUserCollection,
    CheckForPerfumeInUserCollection,
    GetCustomUserCollections,
    CreateCustomCollection,
    GetUserCollections,
    GetUserWithName,
    CheckForPerfumeInCustomCollection,
    UpdateUserCustomCollection,
    AddFragranceToCustomCollection,
    RemoveFragranceFromCustomCollection,
    DeleteCustomCollection,
    GetUserFragranceClassification,
    CreatePerfumeClassificationView,
    UpdateUserFragranceClassification,
    CreateFragranceNote,
    UpdateReviewLikes,
    DisplayReviews,
    UpdateReviewDislikes, 
    UpdateReviewAwards,
    GetAmountOfUserReviews,
    GetPerfumeAvgRatings,
    GetRecentPerfumeRatings,
    DisplayStatements,
    UpdateStatementAwards,
    UpdatePerfumeStatement,
    GetPerfumeRatingsTotal,
    GetPerfumeScentRating,
    ListPerfumesView,
    BrandAutocompleteView,
    PerfumerAutocompleteView,
    BottleDesignerAutocompleteView,
)
from backend.profiles.views import (
    UserProfileView,
    AddPointsView,
    ChangeProfilePictureView
)

from backend.dashboard.views import (
    DashboardView,
)


from backend.notifications.views import GetUserNotifications, MarkNotificationsAsRead, PerfumeSubscribe, PerfumeUnsubscribe, CheckIfUserIsSubscribed
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path("admin/", admin.site.urls),
    # path("_allauth/browser/v1/account/authenticators/totp", views.ManageTOTPView.as_api_view(client='browser')),
    path("_allauth/browser/v1/auth/signup", SignupView.as_api_view(client='browser'), name="signup"),
    path("_allauth/browser/v1/database/", include("backend.database.urls")),
    path("_allauth/browser/v1/research/", include("backend.research.urls")),
    # QFWFM6
   
    # path("_allauth/browser/v1/research/compose", test_compose.as_view()),
    path("_allauth/browser/v1/research/compose", ProposePerfumeView.as_view()),
    path("_allauth/browser/v1/account/propose-edits", test_propose_perfume_edits.as_view()),
    path("_allauth/browser/v1/research/check-edits-id", check_perfume_edits_with_id.as_view()),
    path("_allauth/browser/v1/research/check-edits-name", check_perfume_edits_with_name.as_view()),
    path("_allauth/browser/v1/research/confirm-perfume/<int:pk>/", ConfirmPerfume.as_view()),
    path("_allauth/browser/v1/research/add-source", add_additional_sources.as_view()),
    # path("_allauth/browser/v1/research/get-sources", GetFragranceSourcesView.as_view()),
    path("_allauth/browser/v1/research/propose-discussion", propose_discussion.as_view()),

    # path("_allauth/browser/v1/database/get-perfume", PerfumeView.as_view()),
    # path("database/get-perfume", PerfumeView.as_view()),
    path("_allauth/browser/v1/database/list_perfumes", ListPerfumesView.as_view()),
    # path("_allauth/browser/v1/database/get-perfume-rating", GetPerfumeRatings.as_view()),
    path("_allauth/browser/v1/database/get-recent-perfume-rating", GetRecentPerfumeRatings.as_view()),
    path("_allauth/browser/v1/database/get-perfume-rating-total", GetPerfumeRatingsTotal.as_view()),
    path("_allauth/browser/v1/database/get-perfume-scent-rating", GetPerfumeScentRating.as_view()),
    
    path("_allauth/browser/v1/database/get-perfume-avg-ratings", GetPerfumeAvgRatings.as_view()),
    path("_allauth/browser/v1/database/check-user-perfume-rating", CheckUserRating.as_view()), 
    path("_allauth/browser/v1/database/create-user-perfume-rating", CreatePerfumeRatingView.as_view()), 
    path("_allauth/browser/v1/database/update-user-perfume-rating", UpdatePerfumeRating.as_view()), 
    
    path("_allauth/browser/v1/database/check-user-perfume-review", CheckUserPerfumeReview.as_view()), 
    path("_allauth/browser/v1/database/create-user-perfume-review", CreatePerfumeReviewView.as_view()), 
    path("_allauth/browser/v1/database/update-user-perfume-review", UpdatePerfumeReview.as_view()), 
    path("_allauth/browser/v1/database/update-user-perfume-statement", UpdatePerfumeStatement.as_view()),
    
    path("_allauth/browser/v1/database/check-user-perfume-statement", CheckUserPerfumeStatements.as_view()), 
    path("_allauth/browser/v1/database/create-user-perfume-statement", CreatePerfumeStatementView.as_view()), 
    path("_allauth/browser/v1/database/update-user-perfume-statement", UpdatePerfumeStatement.as_view()), 
    
    path("_allauth/browser/v1/database/update-user-collection", UpdateUserCollection.as_view()), 
    path("_allauth/browser/v1/database/check-for-perfume-in-user-collection", CheckForPerfumeInUserCollection.as_view()),
    path("_allauth/browser/v1/database/get-user-collections", GetUserCollections.as_view()),  
    path("_allauth/browser/v1/database/get-user-custom-collections", GetCustomUserCollections.as_view()), 
    path("_allauth/browser/v1/database/create-user-custom-collection", CreateCustomCollection.as_view()),
    path("_allauth/browser/v1/database/update-user-custom-collection", UpdateUserCustomCollection.as_view()),
    path("_allauth/browser/v1/database/check-for-perfume-in-user-custom-collection", CheckForPerfumeInCustomCollection.as_view()),
    path("_allauth/browser/v1/database/add-fragrance-to-custom-collection", AddFragranceToCustomCollection.as_view()),
    path("_allauth/browser/v1/database/remove-fragrance-from-custom-collection", RemoveFragranceFromCustomCollection.as_view()),
    path("_allauth/browser/v1/database/delete-custom-collection", DeleteCustomCollection.as_view()),
    
    path("_allauth/browser/v1/database/update-review-likes", UpdateReviewLikes.as_view()),
    path("_allauth/browser/v1/database/update-review-dislikes", UpdateReviewDislikes.as_view()),
    path("_allauth/browser/v1/database/update-review-awards", UpdateReviewAwards.as_view()), 
    path("_allauth/browser/v1/database/update-statement-awards", UpdateStatementAwards.as_view()),
    
    path("_allauth/browser/v1/database/display-fragrance-statements", DisplayStatements.as_view()),
    path("_allauth/browser/v1/database/display-fragrance-reviews", DisplayReviews.as_view()),
    
    path("_allauth/browser/v1/database/get-user-notifications", GetUserNotifications.as_view()),
    path("_allauth/browser/v1/database/mark-user-notifications-as-read", MarkNotificationsAsRead.as_view()),
    
    path("_allauth/browser/v1/database/get-user-fragrance-classification", GetUserFragranceClassification.as_view()),
    path("_allauth/browser/v1/database/create-user-fragrance-classification", CreatePerfumeClassificationView.as_view()),
    path("_allauth/browser/v1/database/update-user-fragrance-classification", UpdateUserFragranceClassification.as_view()),
    
    path("_allauth/browser/v1/database/get-user-review-total", GetAmountOfUserReviews.as_view()),
    
    path("_allauth/browser/v1/database/create-fragrance-note", CreateFragranceNote.as_view()),
    
    path("_allauth/browser/v1/database/perfume-subscribe", PerfumeSubscribe.as_view()),
    path("_allauth/browser/v1/database/perfume-unsubscribe", PerfumeUnsubscribe.as_view()),
    path("_allauth/browser/v1/database/check-user-subscription", CheckIfUserIsSubscribed.as_view()),
    # path("_allauth/browser/v1/database/check-for-perfume-in-collection", Check.as_view()), 
    
    path("_allauth/browser/v1/profile/update-pfp/", ChangeProfilePictureView.as_view()),
    
    
    # path("_allauth/browser/v1/account/propose-edits", propose_perfume_edits.as_view()),
    path("_allauth/browser/v1/account/is-research-auditor", is_research_auditor.as_api_view(client='browser'), name="group"),
    path("_allauth/browser/v1/account/is-research-manager", is_research_manager.as_api_view(client='browser'), name="group"),
    path("_allauth/browser/v1/account/get-user-from-username", GetUserWithName.as_view()),
    path("_allauth/browser/v1/account/profile", UserProfileView.as_view()),
    path("_allauth/browser/v1/account/create-collection", CreateUserCollectionView.as_view()),
    path("_allauth/browser/v1/account/add-points/", AddPointsView.as_view()),
    path("_allauth/browser/v1/account/parent-companies/<int:pk>/", test_parent_companies.as_view()),
    path("_allauth/browser/v1/account/parent-companies/", test_parent_companies_detail.as_view()),
    path("_allauth/browser/v1/account/pending-approvals/<int:pk>/", test_pending_proposals.as_view()),
    path("_allauth/browser/v1/account/pending-approvals/", test_pending_proposals_details.as_view()),
    path("_allauth/browser/v1/account/dashboard-info", DashboardView.as_view()),
    
    path("accounts/", include("allauth.urls")),
    path("_allauth/", include("allauth.headless.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)