from django.urls import path

from .views import GetTeachers, AddTeacher, AddTSC, AddRole, AddClass, AddSub

urlpatterns = [
    path('teacher/', GetTeachers.as_view()),
    path('teacher/cre', AddTeacher.as_view()),
    path('teacher/tsc', AddTSC.as_view()),
    path('role/', AddRole.as_view()),
    path('class/', AddClass.as_view()),
    path('sub/', AddSub.as_view()),
]
