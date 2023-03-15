<<<<<<< Updated upstream
from django.shortcuts import render
from . import models
<<<<<<< HEAD
from rest_framework import generics, permissions
from .serializers import StudentSerializer
=======
from rest_framework import viewsets, generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
>>>>>>> 8598150e701af9dda43e3803f8981778fb9a196f

# Create your views here.
def index(request):
    return render(request, 'build/index.html')

<<<<<<< HEAD
class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    permission_classess = [permissions.IsAuthenticated]

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    permission_classess = [permissions.IsAuthenticated]
=======
# from django.shortcuts import render

# # Create your views here.
# def index(request):
#     return render(request, 'build/index.html')

# from django.shortcuts import render,redirect
# from django.contrib.auth import authenticate, login, logout
# from django.contrib import messages
# # authenticate/login.html points to the file in authenticate folder

# def login_user(request):
#     return render(request, '../../frotend/src/Pages/Login.js', {})


>>>>>>> Stashed changes
=======
# REST API for School
@api_view(['GET'])
def SchoolList(request):
    schools = models.School.objects.all()
    serializer = SchoolSerializer(schools, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def SchoolDetail(request, pk):
    school = models.School.objects.get(school_id=pk)
    serializer = SchoolSerializer(school, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def SchoolCreate(request):
    serializer = SchoolSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def SchoolUpdate(request, pk):
    school = models.School.objects.get(school_id=pk)
    serializer = SchoolSerializer(instance=school, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def SchoolDelete(request, pk):
    school = models.School.objects.get(school_id=pk)
    school.delete()

###############################################################################################################

# REST API for Department
@api_view(['GET'])
def DepartmentList(request):
    departments = models.Department.objects.all()
    serializer = DepartmentSerializer(departments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def DepartmentDetail(request, pk):
    department = models.Department.objects.get(department_id=pk)
    serializer = DepartmentSerializer(department, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def DepartmentCreate(request):
    serializer = DepartmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def DepartmentUpdate(request, pk):
    department = models.Department.objects.get(department_id=pk)
    serializer = DepartmentSerializer(instance=department, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def DepartmentDelete(request, pk):
    department = models.Department.objects.get(department_id=pk)
    department.delete()

###############################################################################################################

# REST API for Faculty 
@api_view(['GET'])
def FacultyList(request):
    faculties = models.Faculty.objects.all()
    serializer = FacultySerializer(faculties, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def FacultyDetail(request, pk):
    faculty = models.Faculty.objects.get(faculty_id=pk)
    serializer = FacultySerializer(faculty, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def FacultyCreate(request):
    serializer = FacultySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def FacultyUpdate(request, pk):
    faculty = models.Faculty.objects.get(faculty_id=pk)
    serializer = FacultySerializer(instance=faculty, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def FacultyDelete(request, pk):
    faculty = models.Faculty.objects.get(faculty_id=pk)
    faculty.delete()

###############################################################################################################

# REST API for Student 
@api_view(['GET'])
def StudentList(request):
    students = models.Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def StudentDetail(request, pk):
    student = models.Student.objects.get(student_id=pk)
    serializer = StudentSerializer(student, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def StudentCreate(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def StudentUpdate(request, pk):
    student = models.Student.objects.get(student_id=pk)
    serializer = StudentSerializer(instance=student, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def StudentDelete(request, pk):
    student = models.Student.objects.get(student_id=pk)
    student.delete()

###############################################################################################################

# REST API for Course
@api_view(['GET'])
def CourseList(request):
    courses = models.Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def CourseDetail(request, pk):
    course = models.Course.objects.get(course_id=pk)
    serializer = CourseSerializer(course, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def CourseCreate(request):
    serializer = CourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def CourseUpdate(request, pk):
    course = models.Course.objects.get(course_id=pk)
    serializer = CourseSerializer(instance=course, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def CourseDelete(request, pk):
    course = models.Course.objects.get(course_id=pk)
    course.delete()

###############################################################################################################

# REST API for Enrollment
@api_view(['GET'])
def EnrollmentList(request):
    enrollments = models.Enrollment.objects.all()
    serializer = EnrollmentSerializer(enrollments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def EnrollmentDetail(request, pk):
    enrollment = models.Enrollment.objects.get(enrollment_id=pk)
    serializer = EnrollmentSerializer(enrollment, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def EnrollmentCreate(request):
    serializer = EnrollmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def EnrollmentUpdate(request, pk):
    enrollment = models.Enrollment.objects.get(enrollment_id=pk)
    serializer = EnrollmentSerializer(instance=enrollment, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def EnrollmentDelete(request, pk):
    enrollment = models.Enrollment.objects.get(enrollment_id=pk)
    enrollment.delete()

###############################################################################################################
>>>>>>> 8598150e701af9dda43e3803f8981778fb9a196f
