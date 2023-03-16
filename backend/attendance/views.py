from django.shortcuts import render
from main.models import Location
from django.http import JsonResponse

# Create your views here.
def faculty_view(request):
    faculty_id = request.POST.get('faculty_id')

    if request.method == 'POST':
        lat = request.POST.get('lat')
        lng = request.POST.get('lng')

    try:
        location = Location.objects.get(faculty_id=faculty_id)
        location.latitude = lat
        location.longitude = lng
        location.save()

        response = {
            'success': True,
            'location_id': location.id
        }

        return JsonResponse(response)
    
    except Location.DoesNotExist:
        location = Location.objects.create(
            faculty_id = faculty_id,
            latitude = lat,
            longitude = lng
        )

        response = {
            'success': True,
            'location_id': location.id
        }

        return JsonResponse(response)

    return render(request, 'build/index.html')


def student_view(request):
    return