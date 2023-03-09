<<<<<<< Updated upstream
from django.shortcuts import render
from . import models
from rest_framework import generics, permissions
from .serializers import StudentSerializer

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
