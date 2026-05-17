from .models import Student, Subject, Mark
from rest_framework import serializers

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("id", "fname", "lname", "roll_no", "class_div")