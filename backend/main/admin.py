from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Student)
admin.site.register(models.Faculty)
admin.site.register(models.Course)
admin.site.register(models.School)
admin.site.register(models.Department)
admin.site.register(models.Enrollment)
admin.site.register(models.Building)
admin.site.register(models.Room)
admin.site.register(models.Attendance)
admin.site.register(models.Location)