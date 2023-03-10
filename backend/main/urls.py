from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('student/', views.StudentList.as_view()),
    path('student/<int:pk>/', views.StudentDetail.as_view()),
    path('faculty/', views.FacultyList.as_view()),
    path('faculty/<int:pk>/', views.FacultyDetail.as_view()),
]