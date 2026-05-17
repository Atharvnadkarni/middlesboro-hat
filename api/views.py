from django.shortcuts import render
from rest_framework import generics
from .models import Student, Mark
from .serializers import StudentDetailsSerializer, MarksSerializer, StudentMarksSerializer

# Create your views here.


class CreateStudentView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentDetailsSerializer


class StudentMarkListView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentMarksSerializer


class MarkUpdateView(generics.CreateAPIView):
    serializer_class = MarksSerializer

    def get_queryset(self):
        student_id = self.request.query_params.get("student")

        return Mark.objects.filter(student_id=student_id)
