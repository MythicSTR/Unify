from django.db import models

# Create your models here.

# Student Model
class Student(models.Model):
    student_id = models.CharField(max_length=10, primary_key=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    date_of_birth = models.DateField()
    email = models.EmailField(max_length=254, unique=True)
    country = models.CharField(max_length=50)
    province = models.CharField(max_length=50)
    district = models.CharField(max_length=50)
    street_address = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=14)
    admission_date = models.DateField()
    graduation_date = models.DateField()