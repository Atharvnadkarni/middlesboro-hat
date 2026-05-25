from django.urls import path

from .views import HandleTeacher, HandleTeacherIndividual

urlpatterns = [
    path('teacher/', HandleTeacher.as_view()),
    path('teacher/<int:id>/', HandleTeacherIndividual.as_view()),
]
