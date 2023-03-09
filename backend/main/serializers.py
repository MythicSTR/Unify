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