from django.urls import path

from .views import HandleTeacher, HandleTeacherIndividual, LoginView,CSRFView,LogoutView,MeView, HandleStudentsData

urlpatterns = [
    path('teacher/', HandleTeacher.as_view()),
    path('teacher/<int:id>/', HandleTeacherIndividual.as_view()),
    path('csrf/', CSRFView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('me/', MeView.as_view()),
    path('add-students/', HandleStudentsData.as_view()),
]
