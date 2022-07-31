from rest_framework import viewsets
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth.models import User
from .serializers import HufQuizSerializer, HufQuizOptionSerializer, HufQuizQnSerializer, HufQuizResultSerializer
from .models import HufQuiz, HufQuizOption, HufQuizQn, HufQuizResult
import json

class HufQuizViewSet(viewsets.ModelViewSet):
    queryset = HufQuiz.objects.all()
    serializer_class = HufQuizSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ['game_id']


class HufQuizQnViewSet(viewsets.ModelViewSet):
    queryset = HufQuizQn.objects.all()
    serializer_class = HufQuizQnSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ['quiz_id']


class HufQuizOptionViewSet(viewsets.ModelViewSet):
    queryset = HufQuizOption.objects.all().order_by('quiz_qn_id', 'option_id')
    serializer_class = HufQuizOptionSerializer


class HufQuizResultViewSet(viewsets.ModelViewSet):
    queryset = HufQuizResult.objects.all()
    serializer_class = HufQuizResultSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ['user_id']


@csrf_exempt
def getQuizTopFive(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    quiz_id = body['quiz_id']
    topfive = HufQuizResult.objects.filter(quiz_id=quiz_id).order_by('-score_earned')[:5].values('id',"quiz_id","score_earned", "duration_taken", "user_id", 'user_id_id__username')
    topfivelist = list(topfive)
    return JsonResponse({"topfive":topfivelist})


@csrf_exempt
def getDashboardTopFive(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    game_id = body['game_id']

    quizzesOfTheGame = HufQuiz.objects.filter(game_id=game_id).values('quiz_id')
    quizzesOfTheGameList = list(quizzesOfTheGame)

    quiz_ids = []
    for object in quizzesOfTheGameList:
        quiz_ids.append(object['quiz_id'])
    
    result_arr = []
    for currentquizid in quiz_ids:
        topfivequiz = HufQuizResult.objects.filter(quiz_id=int(currentquizid)).order_by('-score_earned')[:5].values('id',"quiz_id","score_earned", "duration_taken", "user_id", 'user_id_id__username')
        result_arr += list(topfivequiz)

    return JsonResponse({'result':result_arr})






# @api_view(["POST"])
# def postUserAns(request):
#
#     # respone.data needs to linked to fontend response
#     userId = request.data.get('userId', None)
#     quiz_qz_id = request.data.get('quizQnId', None)
#     answer = request.data.get('answer', None)
#
#     if request.method == 'POST':
#
#         # Add user snwers to the table
#         saveSerializer = HufUserAnsSerializer(data=request.data)
#         if saveSerializer.is_valid():
#             saveSerializer.save(username=userId, quiz_qn=quiz_qz_id, user_ans=answer)
#
#         quiz_question = HufQuizQn.objects.get(quiz_qn_id=quizQnId)
#         quiz_result = HufQuizResult.objects.get(username=userId)
#
#         # Check if answer is correct
#         if int(answer) == quiz_question.correct_ans:
#
#             # Increase the score
#             if quiz_result.score_earned == NULL:
#                 quiz_result.score_earned = 1
#                 quiz_result.save()
#             else:
#                 quiz_result.score_earned += 1
#                 quiz_result.save()
#
#     return JsonResponse({"UserAnswer": "Completed"})
#
#
#
# def getCorrectAns(request, id):
#     queryset = HufQuizQn.objects.filter(quiz_qn_id = id).order_by().values()
#     return JsonResponse({"models_to_return": list(queryset)})
