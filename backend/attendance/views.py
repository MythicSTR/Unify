from django.shortcuts import render
from main.models import Location, Attendance, Student, Faculty, Course, Session
from django.views.decorators.csrf import csrf_exempt
import json
from django.core import serializers
from django.http import JsonResponse
from datetime import datetime

    # faculty_id = request.POST.get('faculty_id')

    # if request.method == 'POST':
    #     lat = request.POST.get('lat')
    #     lng = request.POST.get('lng')

    # try:
    #     location = Location.objects.get(faculty_id=faculty_id)
    #     location.latitude = lat
    #     location.longitude = lng
    #     location.save()

    #     response = {
    #         'success': True,
    #         'location_id': location.id
    #     }

    #     return JsonResponse(response)
    
    # except Location.DoesNotExist:
    #     location = Location.objects.create(
    #         faculty_id = faculty_id,
    #         latitude = lat,
    #         longitude = lng
    #     )

    #     response = {
    #         'success': True,
    #         'location_id': location.id
    #     }

    #     return JsonResponse(response)

    # return render(request, 'build/index.html')


def student_view(request):
    print("writing to database")
    if request.method == 'POST':
        # date = request.POST.get('date');
        status = request.POST.get('status');
        course_id = request.POST.get('course_id');
        faculty_id= request.POST.get('faculty_id');
        student_id = request.POST.get('student_id');

    try:
        print("entered try block")
        date = datetime.today().strftime('%Y-%m-%d')
        
        attendance = Attendance.objects.create(
            student = Student.objects.get(student_id=student_id),
            faculty = Faculty.objects.get(faculty_id=faculty_id),
            course = Course.objects.get(course_id=course_id),
            date = date,
            status = status
        )

        response = {
            'success': True,
            'status': 'Present'
        }

        return JsonResponse(response)
    except Exception as e:
        print(e)
    
    return render(request, 'build/index.html')