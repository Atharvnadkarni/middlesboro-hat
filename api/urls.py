from django.urls import path

from .views import GetTeachers

urlpatterns = [
    path('teacher/', GetTeachers.as_view())
]
