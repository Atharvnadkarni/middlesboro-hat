from django.db import models

# Create your models here.
class Student(models.Model):
    surname = models.CharField(max_length=100, blank=False)
    first_name = models.CharField(max_length=100, blank=False)
    roll_no = models.IntegerField(blank=False)
    class_div = models.CharField(max_length = 4, blank=False)
    def __str__(self):
        return f"{self.first_name} {self.surname}"

class Subject(models.Model):
    sub = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.sub}"
    
class Mark(models.Model):
    student = models.ForeignKey(to=Student, on_delete=models.CASCADE, related_name="marks")
    subject = models.ForeignKey(to=Subject, on_delete=models.CASCADE)
    score = models.IntegerField()