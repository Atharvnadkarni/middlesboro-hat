from django.shortcuts import render
from rest_framework import generics
from .models import Student, Mark, Teacher, Class, Subject, Role
from .serializers import StudentDetailsSerializer, MarksSerializer, StudentMarksSerializer, TeacherSerializer, ClassSerializer, SubjectSerializer, RoleSerializer

# Create your views here.


class CreateStudentView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentDetailsSerializer

class RoleViewCreate(generics.ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class StudentMarkListView(generics.ListAPIView):
    queryset = Class.objects.all()
    serializer_class = StudentMarksSerializer
    
class CreateClassView(generics.ListCreateAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    
class CreateTeacherView(generics.DestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    
class CreateSubjectView(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer



class MarkUpdateView(generics.CreateAPIView):
    serializer_class = MarksSerializer

    def get_queryset(self):
        student_id = self.request.query_params.get("student")

        return Mark.objects.filter(student_id=student_id)
