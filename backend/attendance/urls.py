from django.urls import path, include
from . import views

urlpatterns = [
    path('faculty/', views.faculty_view),
    path('student/', views.student_view),
]