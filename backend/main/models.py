from django.db import models
from django.db.models import CASCADE, PROTECT

# Create your models here.

# School Model
class School(models.Model):
    school_id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=50)

    def __str(self):
        return self.name


# Department Model
class Department(models.Model):
    department_id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE)

# Student Model
class Student(models.Model):
    student_id = models.CharField(max_length=12, primary_key=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    date_of_birth = models.DateField()
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=20,default='123456')
    dept_id = models.CharField(max_length=10)
    country = models.CharField(max_length=50)
    province = models.CharField(max_length=50)
    district = models.CharField(max_length=50)
    street_address = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=14)
    admission_date = models.DateField()
    graduation_date = models.DateField()


# Faculty Model
class Faculty(models.Model):
    faculty_id = models.CharField(max_length=12, primary_key=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    date_of_birth = models.DateField()
    email = models.EmailField(max_length=254, unique=True)
    country = models.CharField(max_length=50)
    password = models.CharField(max_length=20,default='123456')
    province = models.CharField(max_length=50)
    district = models.CharField(max_length=50)
    street_address = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=14)
    hire_date = models.DateField()
    department = models.ForeignKey(Department, on_delete=CASCADE)

# Course Model
class Course(models.Model):
    course_id = models.CharField(max_length=10, primary_key=True)
    course_code = models.CharField(max_length=4)
    name = models.CharField(max_length=10)
    credit_hours = models.IntegerField()
    department = models.ForeignKey(Department, on_delete=CASCADE)
    faculty = models.ManyToManyField(Faculty)
    description = models.TextField(blank=True)
    prerequisites = models.ManyToManyField('self', symmetrical=False, blank=True)

# Enrollment Model
class Enrollment(models.Model):
    enrollment_id = models.CharField(max_length=10, primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrollment_date = models.DateField()
    course_code = models.CharField(max_length=8)

#Feedback Model
class Feedback(models.Model):
    id = models.IntegerField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    dept = models.ForeignKey(Department, on_delete=models.CASCADE)
    comment = models.CharField(max_length=150)
    topic = models.CharField(max_length=10)

# Building Model
class Building(models.Model):
    building_id = models.CharField(max_length=4, primary_key=True)
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    description = models.TextField(blank=True)

# Room Model
class Room(models.Model):
    room_id = models.CharField(max_length=4, primary_key=True)
    number = models.CharField(max_length=10)
    capacity = models.IntegerField()
    building = models.ForeignKey(Building, on_delete=CASCADE)
    description = models.TextField(blank=True)

# Attendance Model
class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    faculty = models.ForeignKey(Faculty, on_delete=PROTECT)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=8)

# Location Model
class Location(models.Model):
    faculty_id = models.CharField(max_length=12)
    latitude = models.FloatField()
    longitude = models.FloatField()

# KU Events
class KU_events(models.Model):
    ID = models.IntegerField(primary_key=True)
    heading = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    start_date = models.DateField()
    end_date = models.DateField()

# Department Events
class Dept_events(models.Model):
    ID = models.IntegerField(primary_key=True)
    heading = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    dept = models.ForeignKey(Department,on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()

# Classrooms
# class Room(models.Model):
#     dept_id = models.ForeignKey(Department,on_delete=CASCADE)
#     capacity = models.IntegerField()
#     classno = models.IntegerField()
#     blockno = models.IntegerField()
#     lab = models.BooleanField()

