from django.urls import path

from .views import CreateStudentView, StudentMarkListView, MarkUpdateView

urlpatterns = [
    path('home/', CreateStudentView.as_view()),
    path('marks/', StudentMarkListView.as_view()),
    path('mark/', MarkUpdateView.as_view()),
]
