from django.db import models

# Create your models here.
class Student(models.Model):
    fname = models.CharField(max_length=100, blank=False)
    lname = models.CharField(max_length=100, blank=False)
    roll_no = models.IntegerField(blank=False)
    class_div = models.CharField(max_length = 4, blank=False)

class Subject(models.Model):
    sub = models.CharField(max_length=100)
    
class Mark(models.Model):
    student = models.ForeignKey(to=Student, on_delete=models.CASCADE)
    subject = models.ForeignKey(to=Subject, on_delete=models.CASCADE)
    score = models.IntegerField()