from django.urls import path, include
from rest_framework import routers
from . import views

urlpatterns = [
<<<<<<< Updated upstream
    path('', views.index),
<<<<<<< HEAD
    path('student/', views.StudentList.as_view()),
    path('student/<int:pk>/', views.StudentDetail.as_view()),
=======

>>>>>>> Stashed changes
=======

    path('schoollist/', views.SchoolList, name="schoollist"),
    path('schooldetail/<int:pk>/', views.SchoolDetail, name="schooldetail"),
    path('addschool/', views.SchoolCreate, name="schoolcreate"),
    path('updateschool/<int:pk>/', views.SchoolUpdate, name="schoolupdate"),
    path('deleteschool/<int:pk>/', views.SchoolDelete, name="schooldelete"),

    path('departmentlist/', views.DepartmentList, name="departmentlist"),
    path('departmentdetail/<int:pk>/', views.DepartmentDetail, name="departmentdetail"),
    path('adddepartment/', views.DepartmentCreate, name="departmentcreate"),
    path('updatedepartment/<int:pk>/', views.DepartmentUpdate, name="departmentupdate"),
    path('deletedepartment/<int:pk>/', views.DepartmentDelete, name="departmentdelete"),

    path('facultylist/', views.FacultyList, name="facultylist"),
    path('facultydetail/<int:pk>/', views.FacultyDetail, name="facultydetail"),
    path('addfaculty/', views.FacultyCreate, name="facultycreate"),
    path('updatefaculty/<int:pk>/', views.FacultyUpdate, name="facultyupdate"),
    path('deletefaculty/<int:pk>/', views.FacultyDelete, name="facultydelete"),

    path('studentlist/', views.StudentList, name="studentlist"),
    path('studentdetail/<int:pk>/', views.StudentDetail, name="studentdetail"),
    path('addstudent/', views.StudentCreate, name="studentcreate"),
    path('updatestudent/<int:pk>/', views.StudentUpdate, name="studentupdate"),
    path('deletestudent/<int:pk>/', views.StudentDelete, name="studentdelete"),

    path('courselist/', views.CourseList, name="courselist"),
    path('coursedetail/<int:pk>/', views.CourseDetail, name="coursedetail"),
    path('addcourse/', views.CourseCreate, name="coursecreate"),
    path('updatecourse/<int:pk>/', views.CourseUpdate, name="courseupdate"),
    path('deletecourse/<int:pk>/', views.CourseDelete, name="coursedelete"),

    # path('student/', views.StudentList.as_view()),
    # path('student/home/',views.index),
    # path('teacher/home/',views.index),
    # path('department/home/',views.index),
    # path('student/<str:pk>/', views.StudentDetail.as_view()),
    # path('faculty/', views.FacultyList.as_view()),
    # path('faculty/<int:pk>/', views.FacultyDetail.as_view()),

>>>>>>> 8598150e701af9dda43e3803f8981778fb9a196f
]