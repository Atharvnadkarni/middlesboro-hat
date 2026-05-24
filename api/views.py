from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Teacher, TeacherSubjectClass, Role, Class, Subject
from .serializers import TeacherSerializer, TSCSerializer, CreateTeacherSerializer, RoleSerializer, ClassSerializer, SubjectSerializer
import re

# Create your views here.

# /teacher


class HandleTeacher(APIView):
    # Get All Teachers
    serializer_class = TeacherSerializer

    def get(self, request, format=None):
        queryset = Teacher.objects.all()
        serializer_data = self.serializer_class(queryset, many=True)
        return Response(data=serializer_data.data, status=status.HTTP_200_OK)

    # Add Teacher
    create_serializer_class = CreateTeacherSerializer
    response_serializer_class = TeacherSerializer

    def post(self, request, format=None):
        serializer = self.create_serializer_class(data=request.data)
        if serializer.is_valid():
            first_name = serializer.validated_data.get("first_name")
            surname = serializer.validated_data.get("surname")
            role = serializer.validated_data.get("role")
            class_tr = serializer.validated_data.get("class_tr")
            # convert class_tr like "10B" into [10, "B"]
            division = class_tr[-1] if class_tr else None

            subjects = serializer.validated_data.get("subjects")

            role_obj = Role.objects.get(role=role)
            class_tr_obj = Class.objects.get(grade=10, division=division)

            teacher = Teacher(first_name=first_name,
                              surname=surname, role=role_obj, class_tr=class_tr_obj)
            teacher.save()

            for subject in subjects:
                sub_id = Subject.objects.get(
                    sub=subject.get("subject") if isinstance(
                        subject, dict) else getattr(subject, "subject", None)
                )
                subject_class = (
                    subject.get("class") if isinstance(
                        subject, dict) else getattr(subject, "class", None)
                )
                subject_class_letters = list(
                    subject_class[2:]) if subject_class else []
                classes = [Class.objects.get(division=letter)
                           for letter in subject_class_letters]
                tsc = TeacherSubjectClass.objects.create(
                    teacher=teacher, subject=sub_id)
                tsc.classes.set(classes)
            
            serialize_tr = self.response_serializer_class(teacher)
            return Response(data=serialize_tr.data, status=status.HTTP_201_CREATED)
