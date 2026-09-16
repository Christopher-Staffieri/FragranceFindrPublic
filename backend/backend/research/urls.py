
from django.contrib import admin
from django.urls import include, path

from backend.research.views import (
    ProposeProposalEdits,
    PostFragranceSource,
    GetFragranceSources,
    ConfirmSourceChecklist,
    RemoveSourceChecklistConfirmationView,
    GetFragranceSourcesView,
    GetSourcesCountView
)




urlpatterns = [
    # path("compose/", test_compose.as_api_view(client='browser'), name='compose'),
    path("propose-proposal-edits", ProposeProposalEdits.as_view()),
    path("post-fragrance-source", PostFragranceSource.as_view()),
    path("retrieve-fragrance-sources", GetFragranceSources.as_view()),
    path("confirm-fragrance-source-checklist", ConfirmSourceChecklist.as_view()),
    path("remove-fragrance-source-checklist-confirmation", RemoveSourceChecklistConfirmationView.as_view()),
    path("get-sources", GetFragranceSourcesView.as_view()),
    path("get-fragrance-sources-count", GetSourcesCountView.as_view()),
    
    
    
]
