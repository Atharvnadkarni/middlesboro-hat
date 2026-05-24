from django.urls import path

from .views import GetTeachers

urlpatterns = [
    path('teachers/', GetTeachers.as_view()),
]
