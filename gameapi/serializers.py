from rest_framework import serializers
from .models import HufGame


class HufGameSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = HufGame
        fields = ('game_id', 'username', 'game_name', 'game_tag', 'no_of_quiz', 'game_description', 'total_no_qn')
