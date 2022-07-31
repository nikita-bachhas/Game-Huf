from django.contrib import admin
from .models import HufQuiz, HufQuizOption, HufQuizQn, HufQuizResult


admin.site.register(HufQuiz)
admin.site.register(HufQuizOption)
admin.site.register(HufQuizQn)
admin.site.register(HufQuizResult)
# admin.site.register(HufUserAns)
