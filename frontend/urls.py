from django.urls import path, include
from .views import home_view

urlpatterns = [
    path('', home_view, name="home"),
    path('teachers', home_view, name="teachers"),
]