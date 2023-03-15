from django.urls import path
from . import views

urlpatterns = [
<<<<<<< Updated upstream
    path('', views.index),
    path('student/', views.StudentList.as_view()),
    path('student/<int:pk>/', views.StudentDetail.as_view()),
=======

>>>>>>> Stashed changes
]