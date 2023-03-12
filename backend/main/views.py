from django.shortcuts import render
from . import models
from rest_framework import generics, permissions
from .serializers import *

# Create your views here.
def index(request):
    return render(request, 'build/index.html')

class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    permission_classess = [permissions.IsAuthenticated]

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    permission_classess = [permissions.IsAuthenticated]

class FacultyList(generics.ListCreateAPIView):
    queryset = models.Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classess = [permissions.IsAuthenticated]

class FacultyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classess = [permissions.IsAuthenticated]