from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'hufusers', views.UserViewSet)

urlpatterns = [

    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # signup
    path('auth/', obtain_auth_token),  # post request to obtain users' auth token
    # login
    path('login/', views.login_user, name="login"),
    path('logout/', views.logout_user, name="log_out"),
    # forgot password
    path('forgot_password/<email>/', views.forgot_password, name = 'forgot_password'),


################################################FACEBOOK LOGIN########################################################

    path('rest-auth/fblogin/', views.FacebookLogin.as_view(), name='redirect'), 
    path('authenticateuser/',views.get_authenticated_user, name = "get_user_name"),
    path('getinfo/',views.get_info, name = "get_info"),
    
################################################FACEBOOK LOGIN########################################################
    
    # path('rest-auth/fblogout/', views.facebook_logout, name="fblogout"),
    # path('rest-auth/token/', views.facebook_access_token, name='fb_access_token'),
    # path('accounts/', include('allauth.urls')),
    # path('facebookapitest/', views.home_page, name='home_page'),  # redirect to html login file
    
]
