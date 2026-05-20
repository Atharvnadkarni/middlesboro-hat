from django.urls import path

from .views import CreateStudentView, StudentMarkListView, MarkUpdateView, CreateClassView, CreateTeacherView, CreateSubjectView, RoleViewCreate

urlpatterns = [
    path('home/', CreateStudentView.as_view()),
    path('marks/', StudentMarkListView.as_view()),
    path('mark/', MarkUpdateView.as_view()),
    path('class/', CreateClassView.as_view()),
    path('teacher/', CreateTeacherView.as_view()),
    path('subject/', CreateSubjectView.as_view()),
    path('role/', RoleViewCreate.as_view()),
]
