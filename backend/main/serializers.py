from rest_framework import serializers
from . import models

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = [
            'student_id',
            'first_name',
            'last_name',
            'date_of_birth',
            'email',
            'country',
            'province',
            'district',
            'street_address',
            'city',
            'phone_number',
            'admission_date',
            'graduation_date'
        ]

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Faculty
        fields = [
            'faculty_id',
            'first_name',
            'last_name',
            'date_of_birth',
            'email',
            'country',
            'province',
            'district',
            'street_address',
            'city',
            'phone_number',
            'hire_date',
            'department'
        ]

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = [
            'course_id',
            'course_code',
            'name',
            'credit_hours',
            'department',
            'faculty',
            'description',
            'prerequisites'
        ]

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.School
        fields = [
            'school_id',
            'name',
        ]

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Department
        fields = [
            'department_id',
            'name',
            'description',
            'school',
        ]

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Enrollment
        fields = [
            'enrollment_id',
            'student',
            'course',
            'enrollment_date',
        ]

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Building
        fields = [
            'building_id',
            'name',
            'code',
            'description',
        ]

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Room
        fields = [
            'room_id',
            'number',
            'capacity',
            'building',
            'description'
        ]