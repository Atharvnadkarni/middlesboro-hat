from django.urls import path

from views import CreateStudentView

urlpatterns = [
    path('home/', CreateStudentView.as_view()),
]
