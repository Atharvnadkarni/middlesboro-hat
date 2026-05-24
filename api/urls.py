from django.urls import path

from .views import HandleTeacher

urlpatterns = [
    path('teacher/', HandleTeacher.as_view()),
]
