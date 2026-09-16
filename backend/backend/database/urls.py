from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static


from backend.database.views import (
    FragranceCollectionAutocompleteView,
    BottleDesignerAutocompleteView,
    PerfumeAutocompleteView,
    BrandAutocompleteView,
    PerfumerAutocompleteView,
    ParentCompanyAutocompleteView,
    GetAllFragrancesInDatabaseView,
    GetAllBrandsInDatabaseView,
    GetRecentlyAddedFragrances,
    PerfumeView,
    GetFragranceProposalView
)


urlpatterns = [
    path("get-fragrance-collections/", FragranceCollectionAutocompleteView.as_view()),
    path("get-searched-bottle-designers/", BottleDesignerAutocompleteView.as_view()),
    path("get-searched-perfumes", PerfumeAutocompleteView.as_view()),
    path("get-searched-brands/", BrandAutocompleteView.as_view()),
    path("get-searched-perfumers/", PerfumerAutocompleteView.as_view()),
    path("get-searched-parent-company/", ParentCompanyAutocompleteView.as_view()),
    
    path("get-all-fragrances-count", GetAllFragrancesInDatabaseView.as_view()),
    path("get-all-brands-count", GetAllBrandsInDatabaseView.as_view()),
    path("get-recently-posted-fragrances", GetRecentlyAddedFragrances.as_view()),
    
    path("get-perfume", PerfumeView.as_view()),
    path("get-fragrance-proposal", GetFragranceProposalView.as_view()),
]