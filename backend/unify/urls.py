"""unify URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', include('main.urls')),
    path('api/', include('main.urls')),
    path('admin/', include('reactadmin.urls')),
    path('faculty/', include('faculty.urls')),
    path('student/', include('student.urls')),
    path('attendance/', include('attendance.urls')),
    path('login_user/',include('django.contrib.auth.urls')),
    path('login_user/', views.login_view, name="login"),
    path('enrollment/',views.enrollment_course,name='enrollment'),
    path('feedback/',views.feedback_view,name='feedback'),
    path('extract_feedback/',views.extract_feedback,name="extract_feedback"),
    path('add_reply/',views.add_reply,name="add_reply"),
    path('add_ku_events/',views.add_ku_events,name='add_ku_events'),
    path('add_dept_events/',views.add_dept_events,name='add_dept_events'),
    path('ku_events/',views.ku_events,name='ku_events'),
    path('dept_events/',views.dept_events,name='dept_events'),
    path('logout/',views.logout,name="logout"),
    path('routine_generator/',views.routine_generator,name="routine_generator"),
    path('routine/',views.routine,name="routine"),
    path('get_routine/',views.get_routine,name="get_routine"),
    path('get_student_classroom/',views.get_student_classroom,name="get_student_classroom"),
    path('get_teacher_classroom/',views.get_teacher_classroom,name="get_teacher_classroom"),
    path('changepassword/',views.changePassword,name="changePassword"),
    path('forgotpassword/',views.changePassword,name="forgotPassword"),
]
