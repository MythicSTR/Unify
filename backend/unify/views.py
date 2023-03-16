import json
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from main.models import Student
from main.models import Faculty

@csrf_exempt
def login_view(request):
    print("console running")
    if request.method == "POST":
        print("inside post method")
        data = json.loads(request.body)
        _email = data.get('email')
        password = data.get('password')
        print(_email)
        print(password)

        email_checker = _email.split('@')[1]

        if email_checker == 'student.ku.edu.np':
            student_results = Student.objects.filter(email=_email)
            for result in student_results:
                return JsonResponse({'message':'Student'}, status=400)
            
            else:
                return JsonResponse({'message':'Not Student'}, status=400)

        else:
            faculty_answers = Faculty.objects.filter(email=_email)
            for answer in faculty_answers:
                return JsonResponse({'message':'Teacher'}, status=400)
            
            else:
                return JsonResponse({'message':'Invalid'}, status=400)