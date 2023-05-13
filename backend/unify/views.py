import json
from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password,check_password
from django.contrib.auth import authenticate, login,logout
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import JsonResponse
from main.models import Student,Faculty,Enrollment,Department,Course,Feedback,Ku_events,Dept_events,Reply,Routine,Classrooms,Class_notice,Virtual_classroom,Programs
from rest_framework.authtoken.views import ObtainAuthToken
from datetime import datetime, timedelta
from django.forms.models import model_to_dict
import jwt
import numpy as np

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
        'isAdmin' : False,
        'isLoggedin' : True,
        }

    if(role==0):
        payload = {
        'user_mail': email,
        'user_id' : _id,    
        'dept_id' : dept_id,
        'exp': expiration_time,
        'isFaculty' : True,
        'isAdmin' : False,
        'isLoggedin' : True,
        }

    if(role==2):
        payload = {
        'user_mail': email,
        'user_id' : _id,
        'dept_id' : dept_id,
        'exp': expiration_time,
        'isAdmin' : True,
        'isLoggedin' : True,
        }
    
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    decoded_token = jwt.decode(token,JWT_SECRET_KEY,JWT_ALGORITHM)
    print(decoded_token)
    # Return the JWT token as a string
    return token.decode('utf-8')

#login
@csrf_exempt
def login_view(request):
    if request.method == "POST":
        print("login")
        data = json.loads(request.body)
        _email = data.get('email')
        _password = data.get('password')
        # password = make_password(_password)
        # print(password)
        email_checker = _email.split('@')[1]

        if email_checker == 'student.ku.edu.np':
            student_results = Student.objects.filter(email=_email)
            print(student_results)
            for result in student_results:
                _id = result.student_id
                dept_id = result.dept_id
                if check_password(_password,result.password):
                    return JsonResponse({'message':'Student','token':generate_jwt_token(_email,_id,dept_id,1),'id':_id},status=400)
                else:
                    return JsonResponse({'message':'Not Student'}, status=400)
            else:
                return JsonResponse({'message':'Not Student'}, status=400)

        else:
            faculty_answers = Faculty.objects.filter(email=_email)
            for answer in faculty_answers:
                _id = answer.faculty_id
                dept_id = answer.department_id

                if _id == "KUADM200001":
                    if check_password(_password,answer.password):
                        print("admin part")
                        return JsonResponse({'message':'Admin','token':generate_jwt_token(_email,_id,dept_id,2),'id':_id},status=400)
                    
                else:
                    if check_password(_password,answer.password):
                        print("faculty part")
                        return JsonResponse({'message':'Teacher','token':generate_jwt_token(_email,_id,dept_id,0)}, status=400)
            
            else:
                return JsonResponse({'message':'Invalid'}, status=400)

#enrollment          
@csrf_exempt
def enrollment_course(request):
    if request.method == "POST":
        data = json.loads(request.body)
        course_code = data.get('course_code')
        student_id = data.get('student_id')
        enrollment_date = data.get('enroll_date')
        teacher_id = data.get('teacher_id')
        course_id = Course.objects.filter(course_code=course_code).values_list('course_id')[0]
        already_enrolled = Enrollment.objects.filter(course_id=course_id[0],course_code=course_code,student_id=student_id,teacher_id=teacher_id)
        for already_enroll in already_enrolled:
            return JsonResponse({'message':'already enrolled'},status=400)
        
        else:
            try:
                # what = Enrollment.objects.create(enrollment_date=datetime.today().date(),course_id=course_code,student_id=student_id)
                # count = Enrollment.objects.filter().count()
                id = Virtual_classroom.objects.filter(teacher_id=teacher_id,course_code__iexact=course_code).values_list('id')[0]
                print(id[0])
                Enrollment.objects.create(enrollment_date=enrollment_date,course_id=course_id[0],student_id=student_id,course_code=course_code,teacher_id=teacher_id,classroom_id=id[0])
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

#receive feedback for teacher
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
        heading = data.get('title')
        description = data.get('description')
        start_date = data.get('start_date')
        end_date = data.get('end_date')

    try:
        Ku_events.objects.create(heading=heading,description=description,start_date=start_date,end_date=end_date)
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
            events = Ku_events.objects.filter()
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

#logout
@csrf_exempt
def logout(request):
    if request.method == "POST":
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
            'isAdmin' : data.get('isAdmin'),
            # 'isFaculty' : True,
            # 'isStudent' : data.get('isStudent'),
            # 'isAdmin' : False,
            'isLoggedin' : False,
        }
        token = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
        # Return the JWT token as a string
        #return token.decode('utf-8')
        return JsonResponse({'token':token.decode('utf-8')},status=400)
    #     #return JsonResponse({'message':"kei che bhayo"},status=500)
    return JsonResponse({'message':'error'},status=500)

#to save routine
@csrf_exempt
def routine(request):
    if request.method=="POST":
        data = json.loads(request.body)
        routine = data.get('_routine')
        dept_id = data.get('dept_id')
        program_id = data.get('program_id')
        batch = data.get('batch')
        # week_day = data.get('week_day')
        # start_time = data.get('start_time')
        # end_time = data.get('end_time')
        # course = data.get('course')
        block_no = data.get('block_no')

        print(routine,dept_id,program_id,batch)
    try:
        for item in routine:
            print(item)
            hours = item['end_time'] - item['start_time']
            Routine.objects.create(
                dept_id=dept_id,
                program_id=program_id,
                batch=batch,
                week_day=item['week_day'],
                start_time=item['start_time'],
                end_time=item['end_time'],
                hours=hours,
                block_no=block_no,
                course=item['course']
            )
            
        return JsonResponse({'message':'sucess'},status=200)
    except:
        return JsonResponse({'message':'error'},status=500)
    
#to extract routine 
#batch kasari extract garne tyo kura baki cha
@csrf_exempt
def get_routine(request):
    if request.method == "POST":
        data = json.loads(request.body)
        batch = data.get('batch')
        program = data.get('program_id')
        user_id = data.get('user_id')
        dept_id = data.get('dept_id')

    try:
        student = Student.objects.filter(student_id=user_id)
        if student.exists():
            program_id = Programs.objects.filter(dept_id=dept_id).values_list('id')[0]
            routine = Routine.objects.filter(dept_id=dept_id,batch=batch,program_id=program_id[0])
            _object = list(routine)
            object = [model_to_dict(item) for item in _object]
            return JsonResponse(object,safe=False)
        else:
            program_id = Programs.objects.filter(name__iexact=program).values_list('id')[0]
            routine = Routine.objects.filter(dept_id=dept_id,batch=batch,program_id=program_id[0])
            _object = list(routine)
            object = [model_to_dict(item) for item in _object]
            return JsonResponse(object,safe=False)
    except:
        return JsonResponse({"message":"error"},status=500)
    

#to allocate classroom to already prepared routine  
@csrf_exempt
def routine_generator(request):
    if request.method == "POST":
        data = json.loads(request.body)
        dept_id = data.get('dept_id')
        block_no = data.get('block_no')

    #list of available classrooms in the given block
    _rooms = Classrooms.objects.filter(blockno=block_no).values_list('classno')
    rooms = list(_rooms)
    rooms = [t[0] for t in rooms]

    #list of time
    times = [7,8,9,10,11,12,13,14,15]

    #list of days
    days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]

    #dictionary of routine for each day
    routine_of_each_day = {"Sunday":[],"Monday":[],"Tuesday":[],"Wednesday":[],"Thursday":[],"Friday":[]}

    try:
        for day in days:
            for routine_of_day in routine_of_each_day:
                get_value = Routine.objects.filter(dept_id=dept_id,week_day=day)
                routine_of_each_day[day] = [model_to_dict(item) for item in get_value]

        # actual allocation of classrooms takes places here:
        try:
            for din in days:  #loops through each day
                routine_of_given_day = routine_of_each_day[din]     #getting the routine of each day while looping through each day
                classrooms = np.zeros((9,len(rooms)))   # matrix of classroom. With rows denoting time and columns denoting room
                for x in range(7,16):   #looping through start_time
                    for item in routine_of_given_day:  #for each class in the routine
                        if item['start_time'] == x:  # with start time == start_time. Only runs if class exist at that time
                            hours = item['hours']   # getting the class duration
                            val = 1
                            column = 0  #column refers to class room
                            row = x # row refers to time
                            while val <= hours:     # looping through the duration of class
                                if classrooms[times.index(row)][column] == 0:
                                    if val==hours:
                                        #item['classno'] = rooms[column] 
                                        Routine.objects.filter(id=item['id']).update(room_no=rooms[column])
                                        val += 1
                                        for i in range(hours):
                                            classrooms[times.index(row-i)][column] = 1
                                    else:   # checking for next hour ma class khali cha ki nai
                                        if classrooms[times.index(row+1)][column] == 0:   # if available
                                            val += 1
                                            row += 1
                                        else:   # if not available
                                            column += 1
                                            val = 1
                                            row = x
                                else:
                                    column += 1

                
            return JsonResponse({'message':"working"},status=500)
        except:
            return JsonResponse({'message':'error from second try block'},status = 500)

    except:
        return JsonResponse({"message":"error from first try block"},status=500)

#get student classroom - student ko view
@csrf_exempt
def get_student_classroom(request):
    if request.method == "POST":
        data = json.loads(request.body)
        student_id = data.get('user_id')

    try:
        _courses = list(Enrollment.objects.filter(student_id=student_id))
        courses = [model_to_dict(item) for item in _courses]
        return JsonResponse(courses,safe=False)
    except:
        return JsonResponse({'message':'error'},status=500)

#get teacher classroom - teacher ko view
@csrf_exempt
def get_teacher_classroom(request):
    if request.method == "POST":
        data = json.loads(request.body)
        teacher_id = data.get('user_id')

        try:
            # courses = list(Virtual_classroom.objects.filter(teacher_id = teacher_id).values('course_code','course_id'))
            courses = list(Virtual_classroom.objects.filter(teacher_id = teacher_id).values('course_code','program_id','batch'))
            return JsonResponse(courses,safe=False)
        except:
            return JsonResponse({'message':'error'},status=500)
        
#change password
@csrf_exempt
def changePassword(request):
    if request.method=="POST":
        data = json.loads(request.body)
        email = data.get('email')
        oldpassword = data.get('oldpassword')
        newpassword = data.get('newpassword')

    try:
        user = Student.objects.filter(email=email)  
        if user.exists():
            for item in user:
                if check_password(oldpassword,item.password):
                    user.update(password=make_password(newpassword))
                    return JsonResponse({'message':'Ok'},status=400)
                else:
                    return JsonResponse({'message':'No'},status=500)
        else:
            user = Faculty.objects.filter(email=email)
            if user.exists():
                for item in user:
                    if check_password(oldpassword,item.password):
                        user.update(password=make_password(newpassword))
                        return JsonResponse({'message':'Ok'},status=400)
                    else:
                        return JsonResponse({'message':'No'},status=500)
            else:
                return JsonResponse({'message':'incorrect'},status=500)
    except:
        return JsonResponse({'message':'error'},status=500)
    
#forgot password
@csrf_exempt
def forgotPassword(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get('email')
        id = data.get('id')
        password = data.get('password')
        print(email,id,password)
    try:
        user = Student.objects.filter(email=email,student_id=id)
        print(user)
        if user.exists():
            for item in user:
                user.update(password=make_password(password))
                return JsonResponse({'message':'Ok'},status=400)
        else:
            user = Faculty.objects.filter(email=email,faculty_id=id)
            if user.exists():
                for item in user:
                    user.update(password=make_password(password))
                    return JsonResponse({'message':'Ok'},status=400)
            else:
                return JsonResponse({'message':'incorrect'},status=500) 
    except:
        return JsonResponse({'message':'error'},status=500)

#add classroom notice
@csrf_exempt
def addClassroomNotice(request):
    if request.method == "POST":
        data = json.loads(request.body)
        topic = data.get('topic')
        notice = data.get('notice')
        user_id = data.get('user_id')
        course_code = data.get('course_code')

    try:
        id = Virtual_classroom.objects.filter(teacher_id=user_id,course_code__iexact=course_code).values_list('id')[0]
        Class_notice.objects.create(topic=topic,notice=notice,classroom_id=id[0])
        return JsonResponse({'message':'Ok'},status=400)
    except:
        return JsonResponse({'message':'error'},status=500)
    
#create google classroom
@csrf_exempt
def createClassroom(request):
    if request.method == "POST":
        data = json.loads(request.body)
        batch = data.get('batch')
        course_code = data.get('course_code')
        program_id = data.get('program_id') 
        user_id = data.get('user_id')

    try:
        program = Programs.objects.filter(id__iexact=program_id)
        course = Course.objects.filter(course_code__iexact=course_code)
        if program.exists() & course.exists():
            Virtual_classroom.objects.create(batch=batch,course_code=course_code,program_id=program_id,teacher_id=user_id)
            return JsonResponse({'message':'working'},status=400)
        else:
            return JsonResponse({'message':'incorrect credentials'},status=500)
    except:
        return JsonResponse({'message':'error'},status=500)

# load classrooms for student
@csrf_exempt
def get_classroom_notices_for_student(request):
    if request.method == "POST":
        data = json.loads(request.body)
        id = data.get('classroom')

    try:
        notices =list(Class_notice.objects.filter(classroom_id=id).values('topic','notice'))
        return JsonResponse(notices,safe=False)
    except:
        return JsonResponse({'message':'error'},status=500)
    
#get feedbacks for student
@csrf_exempt
def extract_feedback_for_student(request):
    if request.method == "POST":
        data = json.loads(request.body)
        id = data.get('id')
        reply = []
        new_list = []
        
        try:
            feedbacks = Feedback.objects.filter(student_id=id)
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