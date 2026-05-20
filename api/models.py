from django.db import models

# Create your models here.


class Student(models.Model):
    surname = models.CharField(max_length=100, blank=False)
    first_name = models.CharField(max_length=100, blank=False)
    roll_no = models.IntegerField(blank=False)
    class_div = models.ForeignKey(to=Class, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.first_name} {self.surname}"


class Subject(models.Model):
    sub = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.sub}"


class Mark(models.Model):
    student = models.ForeignKey(
        to=Student, on_delete=models.CASCADE, related_name="marks")
    subject = models.ForeignKey(to=Subject, on_delete=models.CASCADE)
    score = models.IntegerField()


class Class(models.Model):
    grade = models.IntegerField()
    division = models.CharField(max_length=1)


class Role(models.Model):
    role = models.CharField()


class Teacher(models.Model):
    subject = models.ManyToManyField(to=Subject)
    sub_classes = models.ManyToManyField(to=Class)
    role = models.ForeignKey(to=Role, on_delete=models.SET_NULL, null=True)
    class_tr = models.ForeignKey(to=Class, on_delete=models.SET_NULL, null=True, blank=True)
