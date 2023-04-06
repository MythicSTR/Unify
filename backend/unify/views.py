import json
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from main.models import Student
from main.models import Faculty
from main.models import Enrollment
from main.models import Course
from rest_framework.authtoken.views import ObtainAuthToken
from datetime import datetime, timedelta
import jwt

def generate_jwt_token(email,_id):
    """
    Generates a JWT token for the given user.
    """
    # Set the JWT secret key and algorithm
    JWT_SECRET_KEY = 'unIfy'
    JWT_ALGORITHM = 'HS256'

    # Set the expiration time for the token (e.g. 7 days)
    expiration_time = datetime.utcnow() + timedelta(days=7)

    # Generate the JWT token
    payload = {
        'user_mail': email,
        'user_id' : _id,
        'exp': expiration_time
    }
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    
    # Return the JWT token as a string
    return token.decode('utf-8')



@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        _email = data.get('email')
        _password = data.get('password')
        print(_email)
        print(_password)

        email_checker = _email.split('@')[1]

        if email_checker == 'student.ku.edu.np':
            student_results = Student.objects.filter(email=_email,password=_password)
            for result in student_results:
                _id = result.student_id
                return JsonResponse({'message':'Student','token':generate_jwt_token(_email,_id),'id':_id},status=400)
            
            else:
                return JsonResponse({'message':'Not Student'}, status=400)

        else:
            faculty_answers = Faculty.objects.filter(email=_email,password=_password)
            for answer in faculty_answers:
                return JsonResponse({'message':'Teacher','token':generate_jwt_token(_email)}, status=400)
            
            else:
                return JsonResponse({'message':'Invalid'}, status=400)
            
@csrf_exempt
def enrollment_course(request):
    if request.method == "POST":
        data = json.loads(request.body)
        course_code = data.get('course_code')
        student_id = data.get('student_id')
        enrollment_date = data.get('enroll_date')
        course_id = Course.objects.filter(course_code=course_code).values_list('course_id')[0]
        # if(course_id is None):
        #     print("error thapayiyo")
        #     return JsonResponse({'message':'Invalid'},status=200)
        print(course_id[0])
        already_enrolled = Enrollment.objects.filter(course_id=course_id[0],course_code=course_code,student_id=student_id)
        for already_enroll in already_enrolled:
            return JsonResponse({'message':'already enrolled'},status=400)
        
        else:
            try:
                # what = Enrollment.objects.create(enrollment_date=datetime.today().date(),course_id=course_code,student_id=student_id)
                Enrollment.objects.create(enrollment_date=enrollment_date,course_id=course_id[0],student_id=student_id,course_code=course_code)
                return JsonResponse({'message':'succesfully enrolled'},status=400)
            except:
                return JsonResponse({'message':'Invalid'},status=200)
        
