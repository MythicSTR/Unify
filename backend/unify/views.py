import json
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@csrf_exempt
def login_view(request):
    print("console running")
    if request.method == "POST":
        print("inside post method")
        data = json.loads(request.body)
        print(data)
        email = data.get('email')
        password = data.get('password')
        # email = request.POST.get('email')
        # password = request.POST.get('password')
        print(email)
        print(password)
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message':'sucessful'}, status=400)
            #return {'message':'sucessful'}
        else:
            message = 'Invalid email or password. Please try again.'
            return JsonResponse({'message':'sucessful'}, status=500)
            #return {'message':'not sucessful'}
            # return redirect('/login_user')
            #return render(request, '../../frontend/src/Pages/Login.js', {'message': message})
    else:
        return JsonResponse({'message':'not sucessful'})
        #return render(request, '../../frontend/src/Pages/Login.js')