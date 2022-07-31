from rest_framework import viewsets

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .serializers import HufGameSerializer
from .models import HufGame

# Create your views here.


class HufGameViewSet(viewsets.ModelViewSet):
    queryset = HufGame.objects.all()
    serializer_class = HufGameSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ['game_name', 'game_tag', 'username']

