
from django.contrib.auth.models import User
from allauth.exceptions import ImmediateHttpResponse
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from rest_framework.response import Response
from allauth.exceptions import ImmediateHttpResponse
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter

class MyAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        # This isn't tested, but should work
        if sociallogin.is_existing:
            return

            # some social logins don't have an email address, e.g. facebook accounts
            # with mobile numbers only, but allauth takes care of this case so just
            # ignore it
        if 'email' not in sociallogin.account.extra_data:
            return
        try:
            user = User.objects.get(email=sociallogin.user.email)
            sociallogin.connect(request, user)
            # Create a response object
            raise ImmediateHttpResponse('hello')
        except User.DoesNotExist:
            pass
