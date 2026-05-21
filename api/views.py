from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Teacher
from .serializers import TeacherSerializer

# Create your views here.


class GetTeachers(APIView):
    serializer_class = TeacherSerializer

    def get(self, request, format=None):
        queryset = Teacher.objects.all()
        serializer_data = self.serializer_class(queryset, many=True)
        return Response(data=serializer_data.data, status=status.HTTP_200_OK)

