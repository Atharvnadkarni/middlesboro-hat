from .models import Student, Subject, Mark
from rest_framework import serializers


class MarksSerializer(serializers.ModelSerializer):
    # student_name = serializers.SerializerMethodField()
    # subject = serializers.CharField(source='subject.sub')

    class Meta:
        model = Mark
        fields = ("student", "subject", "score")

    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}"

class MarksStudentsSerializer(serializers.ModelSerializer):
    # student_name = serializers.SerializerMethodField()
    # subject = serializers.CharField(source='subject.sub')

    class Meta:
        model = Mark
        fields = ("subject", "score")

    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}"


class StudentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ("id", "first_name", "surname", "roll_no", "class_div")

class StudentMarksSerializer(serializers.ModelSerializer):
    marks = MarksStudentsSerializer(many=True, read_only=True)
    class Meta:
        model = Student
        fields = ("id", "first_name", "surname", "roll_no", "class_div", "marks")
