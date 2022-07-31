from rest_auth.registration.views import SocialLoginView
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from django.shortcuts import render
from datetime import datetime
from django.urls import reverse
from urllib.parse import urlencode
from django.conf import settings
from django.contrib import messages
from django.shortcuts import redirect
from .serializers import UserSerializer
from allauth.socialaccount.models import SocialToken
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, authentication_classes,permission_classes
from django.core.mail import send_mail
import requests
import json
from .models import SocialaccountSocialtoken, SocialaccountSocialaccount

from django.shortcuts import render,get_object_or_404

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def get_authenticated_user(request):
    if request.user.is_authenticated:
        return JsonResponse({"username": request.user.username, "email": request.user.email, "userid":request.user.id })
    else:
        return JsonResponse({"message": 'not authenticated'})


@csrf_exempt
def login_user(request):
    """Logs user into app

    Args:
        request: the http request 
    Returns:
        HttpResponse

    """
    received_json_data = json.loads(request.body.decode("utf-8"))
    username = received_json_data['username']
    password = received_json_data['password']
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({"username": username, "email":user.email,"userid":user.id })
    else:
        return HttpResponse('Unauthorized', status=401)


@csrf_exempt
def logout_user(request):
    """Logs user out of app 

    Args:
        request: the http request 
    Returns:
        HttpResponse
    """
    logout(request)
    return JsonResponse({"message": "successful logout"})


def forgot_password(request, email):
    """Sends new password to user email 

    Args:
        request: the http request 
        email: email of user 
    Returns:
        HttpResponse

    """
    usr = User.objects.get(email=email)
    new_password = usr.date_joined.strftime("%d-%m-%Y")
    usr.set_password(new_password)
    usr.save()
    send_mail("Your new password", ("Your new password is: " + new_password),
              from_email="cz3003huf@gmail.com", recipient_list=[usr.email])
    return JsonResponse({"message": 'Your new password has been sent to your email'})



################################################FACEBOOK LOGIN########################################################

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

def post(self, request, *args, **kwargs):
    response = super(FacebookLogin, self).post(request, *args, **kwargs)
    token = SocialToken.objects.get(key=response.data['key'])
    return Response({'token': token})

@csrf_exempt
def get_info(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    content = body['access_token']
    account = SocialaccountSocialtoken.objects.get(token=content)
    fbusr = SocialaccountSocialaccount.objects.get(id=account.account_id)
    final_dictionary = json.loads(fbusr.extra_data)
    usr = User.objects.get(first_name=final_dictionary['first_name'])
    return JsonResponse({"username": usr.username, "email":usr.email,"userid":usr.id })
  

################################################FACEBOOK LOGIN########################################################




# @csrf_exempt
# def facebook_logout(request):
#     try:
#         social_token = SocialToken.objects.filter(
#             account__user=request.user, account__provider='facebook')
#         x = [items.delete() for items in social_token]
#         return JsonResponse({"message": 'success'})
#     except:
#         return JsonResponse({"message": 'you are not logged in'})


# def facebook_access_token(request):
#     user = SocialaccountSocialtoken.objects.get()
#     return JsonResponse({'token':user.token}) 
# def home_page(request):
#     if request.method == 'POST':
#         request.POST.get("user.socialaccount_set.all.0.get_profile_url()")
#     return render(request, "login.html")
# Create your views here.
