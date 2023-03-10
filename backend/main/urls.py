from django.urls import path
from . import views

urlpatterns = [

    path('', views.index),
    path('student/', views.StudentList.as_view()),
    path('student/home/',views.index),
    path('teacher/home/',views.index),
    path('department/home/',views.index),
    path('student/<int:pk>/', views.StudentDetail.as_view()),

]