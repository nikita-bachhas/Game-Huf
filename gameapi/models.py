# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

from django.db import models
from django.conf import settings


class HufGame(models.Model):
    game_id = models.AutoField(primary_key=True)
    username = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, to_field='username', db_column='username')
    game_name = models.CharField(max_length=20)
    game_tag = models.CharField(max_length=9)
    no_of_quiz = models.IntegerField()
    game_description = models.CharField(max_length=100, blank=True, null=True)
    total_no_qn = models.IntegerField()

