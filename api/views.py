from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Teacher, TeacherSubjectClass, Role, Class, Subject
from .serializers import TeacherSerializer, TSCSerializer, CreateUpdateTeacherSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

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
    create_serializer_class = CreateUpdateTeacherSerializer
    response_serializer_class = TeacherSerializer

    def post(self, request, format=None):
        serializer = self.create_serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response({"Error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)
        first_name = serializer.validated_data.get("first_name")
        surname = serializer.validated_data.get("surname")
        role = serializer.validated_data.get("role")
        class_tr = serializer.validated_data.get("class_tr")
        username = serializer.validated_data.get("username")
        password = serializer.validated_data.get("password")
        
        qs = User.objects.filter(username=username, password=password)
        if qs.exists():
            return Response({"Error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User(username=username)
        user.set_password(password)
        user.save()
        
        # convert class_tr like "10B" into [10, "B"]
        division = class_tr[-1] if class_tr != 'No' else None
        print(division)
        subjects = serializer.validated_data.get("subjects")
        role_obj = Role.objects.get(role=role)
        class_tr_obj = Class.objects.get(
            grade=10, division=division) if division else None
        teacher = Teacher(first_name=first_name,
                          surname=surname, role=role_obj, class_tr=class_tr_obj, user=user)
        teacher.save()
        for subject in subjects:
            sub_id = Subject.objects.get(
                sub=subject.get("subject") if isinstance(
                    subject, dict) else getattr(subject, "subject", None)
            )
            subject_class = (
                subject.get("classes") if isinstance(
                    subject, dict) else getattr(subject, "classes", None)
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

# /teacher/id


class HandleTeacherIndividual(APIView):
    serializer_class = CreateUpdateTeacherSerializer
    response_serializer_class = TeacherSerializer
    # update teacher

    def patch(self, request, id, format=None):
        if not id:
            return Response({"Error": "ID Not Provided in Request"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response({"Error": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)

        teacher_qs = Teacher.objects.filter(id=id)
        if not teacher_qs.exists():
            return Response({"Error": "Teacher ID Does Not Exist"}, status=status.HTTP_404_NOT_FOUND)

        teacher = teacher_qs[0]
        first_name = serializer.validated_data.get("first_name")
        surname = serializer.validated_data.get("surname")
        role = serializer.validated_data.get("role")
        class_tr = serializer.validated_data.get("class_tr")
        subjects = serializer.validated_data.get("subjects")
        username = serializer.validated_data.get("username")
        password = serializer.validated_data.get("password")

        division = class_tr[-1] if class_tr != 'No' else None

        role_obj = Role.objects.get(role=role)
        class_tr_obj = Class.objects.get(
            grade=10, division=division) if division else None

        teacher.first_name = first_name
        teacher.surname = surname
        teacher.role = role_obj
        teacher.class_tr = class_tr_obj
        teacher.save(update_fields=(
            'first_name', 'surname', 'role', 'class_tr'))
        
        user_qs = User.objects.filter(username=username)
        if not user_qs.exists():
            return Response({"Error": "User doesnt exist"})
        
        user = user_qs[0]
        if password:
            user.set_password(password)
            user.save(update_fields=["password"])

        # handling subjects
        new_subjects = []
        for subject in subjects:
            sub_obj = Subject.objects.get(
                sub=subject.get("subject") if isinstance(
                    subject, dict) else getattr(subject, "subject", None)
            )
            subject_class = (
                subject.get("classes") if isinstance(
                    subject, dict) else getattr(subject, "classes", None)
            )
            subject_class_letters = list(
                subject_class[2:]) if subject_class else []
            classes = [Class.objects.get(division=letter)
                       for letter in subject_class_letters]
            class_ids = tuple(sorted([cls.id for cls in classes]))
            new_subjects.append((sub_obj.id, class_ids, sub_obj, classes))

        old_tscs = TeacherSubjectClass.objects.filter(teacher=teacher)
        old_keys = set()
        old_map = {}
        for tsc_value in old_tscs:
            class_ids = tuple(
                sorted(tsc_value.classes.values_list("id", flat=True)))
            key = (tsc_value.subject.id, class_ids)
            old_keys.add(key)
            old_map.setdefault(key, []).append(tsc_value)

        new_keys = {(sub_id, class_ids)
                    for sub_id, class_ids, _, _ in new_subjects}

        to_delete = old_keys - new_keys
        to_add = new_keys - old_keys

        for key in to_delete:
            for tsc_value in old_map.get(key, []):
                tsc_value.delete()

        for sub_id, class_ids, sub_obj, classes in new_subjects:
            if (sub_id, class_ids) in to_add:
                tsc = TeacherSubjectClass.objects.create(
                    teacher=teacher, subject=sub_obj)
                tsc.classes.set(classes)
                
        serialize_tr = self.response_serializer_class(teacher)
                
        return Response(serialize_tr.data, status=status.HTTP_200_OK)


    def delete(self, request, id, format=None):
        teacher = Teacher.objects.get(id=id)
        teacher.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#auth

@method_decorator(ensure_csrf_cookie, name="dispatch")
class CSRFView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"message": "CSRF cookie set"})
    
class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is None:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        login(request, user)

        return Response({
            "message": "Logged in",
            "username": user.username
        })
    
class LogoutView(APIView):

    def post(self, request):

        logout(request)

        return Response({
            "message": "Logged out"
        })
        
class MeView(APIView):

    def get(self, request):

        return Response({
            "username": request.user.username
        })