from django.urls import path

from .views import HandleTeacher, HandleTeacherIndividual, LoginView,CSRFView,LogoutView,MeView

urlpatterns = [
    path('teacher/', HandleTeacher.as_view()),
    path('teacher/<int:id>/', HandleTeacherIndividual.as_view()),
    path('csrf/', CSRFView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
]
