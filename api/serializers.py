from models import Student, Subject, Mark

class StudentSerializer:
    class Meta:
        fields = ("id", "fname", "lname", "roll_no", "class_div")