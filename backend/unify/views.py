import json
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login,logout
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import JsonResponse
from main.models import Student
from main.models import Faculty
from main.models import Enrollment
from main.models import Department,School
from main.models import Course
from main.models import Feedback
from main.models import KU_events
from main.models import Dept_events
from main.models import Reply
from rest_framework.authtoken.views import ObtainAuthToken
from datetime import datetime, timedelta
from django.forms.models import model_to_dict
import jwt

def generate_jwt_token(email,_id,dept_id,role):
    """
    Generates a JWT token for the given user.
    """
    # Set the JWT secret key and algorithm
    JWT_SECRET_KEY = 'unIfy'
    JWT_ALGORITHM = 'HS256'

    # Set the expiration time for the token (e.g. 7 days)
    expiration_time = datetime.utcnow() + timedelta(days=7)
    
    if(role==1):
        # Generate the JWT token
        payload = {
        'user_mail': email,
        'user_id' : _id,
        'dept_id' : dept_id,
        'exp': expiration_time,
        'isStudent' : True,
        'isLoggedin' : True,
        }

    if(role==0):
        # Generate the JWT token
        payload = {
        'user_mail': email,
        'user_id' : _id,
        'dept_id' : dept_id,
        'exp': expiration_time,
        'isFaculty' : True,
        'isLoggedin' : True,
        }
    
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    decoded_token = jwt.decode(token,JWT_SECRET_KEY,JWT_ALGORITHM)
    print(decoded_token)
    # Return the JWT token as a string
    return token.decode('utf-8')

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        _email = data.get('email')
        _password = data.get('password')

        email_checker = _email.split('@')[1]

        if email_checker == 'student.ku.edu.np':
            student_results = Student.objects.filter(email=_email,password=_password)
            for result in student_results:
                _id = result.student_id
                dept_id = result.dept_id
                return JsonResponse({'message':'Student','token':generate_jwt_token(_email,_id,dept_id,1),'id':_id},status=400)
            
            else:
                return JsonResponse({'message':'Not Student'}, status=400)

        else:
            faculty_answers = Faculty.objects.filter(email=_email,password=_password)
            for answer in faculty_answers:
                _id = answer.faculty_id
                dept_id = answer.department_id
                return JsonResponse({'message':'Teacher','token':generate_jwt_token(_email,_id,dept_id,0)}, status=400)
            
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
        already_enrolled = Enrollment.objects.filter(course_id=course_id[0],course_code=course_code,student_id=student_id)
        for already_enroll in already_enrolled:
            return JsonResponse({'message':'already enrolled'},status=400)
        
        else:
            try:
                # what = Enrollment.objects.create(enrollment_date=datetime.today().date(),course_id=course_code,student_id=student_id)
                count = Enrollment.objects.filter().count()
                Enrollment.objects.create(enrollment_id=count+1,enrollment_date=enrollment_date,course_id=course_id[0],student_id=student_id,course_code=course_code)
                return JsonResponse({'message':'succesfully enrolled'},status=400)
            except:
                return JsonResponse({'message':'Invalid'},status=200)

# Add Feedback            
@csrf_exempt
def feedback_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        student_id = data.get('student_id')
        topic = data.get('topic')
        dept_id  = data.get('dept_id')
        comment = data.get('comment')
        email = data.get('email')

        get_dept = Department.objects.filter(department_id=dept_id).values_list('school_id')[0]
        school_id = get_dept[0]
        print(school_id)

    try:
        count = Feedback.objects.filter().count()
        Feedback.objects.create(id=count+1,topic=topic,comment=comment,dept_id=dept_id,school_id=school_id,student_id=student_id,email=email)
        return JsonResponse({'message':'Sucessfull'},status=500)      
    except:
        return JsonResponse({'message':'Error'},status=500)

#add_replies
@csrf_exempt
def add_reply(request):
    if request.method == "POST":
        data = json.loads(request.body)
        feedback_id = data.get('id')
        comment = data.get('comment')

    try:
        Reply.objects.create(comment=comment,feedback_id=feedback_id)
        return JsonResponse({'message':"sucessfull"},status=400)
    except:
        return JsonResponse({'message':'Error'},status=500)

#receive feedback
@csrf_exempt
def extract_feedback(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get('email')
        reply = []
        new_list = []
        
        try:
            feedbacks = Feedback.objects.filter(email=email)
            for feedback in feedbacks:
                replies = Reply.objects.filter(feedback_id = feedback.id)
                if replies.exists():
                    reply.append(replies.values())

            for qs in reply:
                for item in qs:
                    new_list.append(item)

            feedback_list = list(feedbacks)
            feedback_dict_list = [model_to_dict(feedback) for feedback in feedback_list]
            send = feedback_dict_list + new_list
            return JsonResponse(send,safe=False)
        except:
            return JsonResponse({'message':'Error'},status=500)


# Add KU events      
@csrf_exempt
def add_ku_events(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
        heading = data.get('heading')
        description = data.get('description')
        start_date = data.get('start_date')
        end_date = data.get('end_date')

    try:
        KU_events.objects.create(heading=heading,description=description,start_date=start_date,end_date=end_date)
        return JsonResponse({'message':'sucessful'},status=400)
    except:
        return JsonResponse({'message':'Error'},status=500)

# Add departmental events
@csrf_exempt
def add_dept_events(request):
    if request.method == "POST":
        data = json.loads(request.body)
        heading = data.get('heading')
        description = data.get('description')
        dept_id = data.get('dept_id')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
    try:
        Dept_events.objects.create(heading=heading,description=description,dept_id=dept_id,start_date=start_date,end_date=end_date)
        return JsonResponse({'message':'sucessful'},status=400)
    except:
        return JsonResponse({'message':'Error'},status=500)
    
# Return KU events
def ku_events(request):
    if request.method == "GET":   
        # lat = '28.3949'  # latitude of the location you want to check
        # lng = '84.1240'  # longitude of the location you want to check
        # timestamp = 'now'  # the timestamp to check (can be a UNIX timestamp or 'now')

        # response = requests.get(f'https://maps.googleapis.com/maps/api/timezone/json?location={lat},{lng}&timestamp={timestamp}&key=YOUR_API_KEY')
        # data = response.json()

        # if data['status'] == 'OK':
        #     timezone_name = data['timeZoneName']
        #     print(f'The server time zone is {timezone_name}.')
        # else:
        #     print('Failed to retrieve time zone information.')
 
        try:
            events = KU_events.objects.filter()
            data = serializers.serialize('json',events)
            print(data)
            return JsonResponse(data,safe=False)
    
        except:
            return JsonResponse({'message':'error'},status=500)
        
# Return dept events
@csrf_exempt
def dept_events(request):
    if request.method == "POST":    
        data = json.loads(request.body)
        dept_id = data.get('dept_id')
        try:
            events = Dept_events.objects.filter(dept_id=dept_id)
            data = serializers.serialize('json',events)
            return JsonResponse(data,safe=False)
    
        except:
            return JsonResponse({'message':'error'},status=500)

@csrf_exempt
def logout(request):
    print('logout')
    if request.method == "POST":
        print('hahahahahahahahahahahaha')
        data = json.loads(request.body)
        JWT_SECRET_KEY = 'unIfy'
        JWT_ALGORITHM = 'HS256'

        expiration_time = datetime.utcnow() + timedelta(days=7)
        
        # decoded_token = jwt.decode(token,JWT_SECRET_KEY,JWT_ALGORITHM)
        # print(decoded_token['isLoggedin'])

        payload = {
            'user_mail': data.get('user_mail'),
            'user_id' : data.get('user_id'),
            'dept_id' : data.get('dept_id'),
            'exp': expiration_time,
            'isFaculty' : data.get('isFaculty'),
            'isStudent' : data.get('isStudent'),
            'isLoggedin' : False,
        }
        token = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
        # Return the JWT token as a string
        #return token.decode('utf-8')
        return JsonResponse({'token':token.decode('utf-8')},status=400)
    #     #return JsonResponse({'message':"kei che bhayo"},status=500)
    return JsonResponse({'message':'error'},status=500)