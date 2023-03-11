from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('student/', views.StudentList.as_view()),
    path('student/home/',views.index),
    path('teacher/home/',views.index),
    path('department/home/',views.index),
    path('student/<str:pk>/', views.StudentDetail.as_view()),
    path('faculty/', views.FacultyList.as_view()),
    path('faculty/<int:pk>/', views.FacultyDetail.as_view()),

]