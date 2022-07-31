from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from gameapi.models import HufGame


class HufQuiz(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    game_id = models.ForeignKey(HufGame, on_delete=models.CASCADE, db_column='game_id')
    quiz_duration = models.IntegerField(default=1, validators=[MaxValueValidator(100), MinValueValidator(1)])
    quiz_max_score = models.IntegerField()
    quiz_description = models.CharField(max_length=50, blank=True, null=True)
    no_of_qn = models.IntegerField()


class HufQuizQn(models.Model):
    quiz_qn_id = models.AutoField(primary_key=True)
    quiz_id = models.ForeignKey(HufQuiz, on_delete=models.CASCADE, db_column='quiz_id')
    correct_ans = models.IntegerField()
    question_name = models.CharField(max_length=30)
    score_per_qn = models.IntegerField()


class HufQuizOption(models.Model):
    quiz_qn_id = models.ForeignKey(HufQuizQn, on_delete=models.CASCADE, db_column='quiz_qn_id', unique=False, related_name='options')
    option_id = models.IntegerField()
    option_description = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        unique_together = (('quiz_qn_id', 'option_id'),)


class HufQuizResult(models.Model):
    quiz_id = models.ForeignKey(HufQuiz, on_delete=models.CASCADE, db_column='quiz_id', unique=False)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, models.DO_NOTHING, db_column='user_id', unique=False)
    score_earned = models.IntegerField()
    duration_taken = models.IntegerField()

    class Meta:
        unique_together = (('quiz_id', 'user_id'),)
