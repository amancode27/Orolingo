
# todo/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

# add this
# class Todo(models.Model):
#   title = models.CharField(max_length=120)
#   description = models.TextField()
#   completed = models.BooleanField(default=False)
#
#   def __str__(self):
#     return self.title


class User(AbstractUser):
    # USER_TYPE_CHOICES = (
    #     (1, 'student')
    #     (2, 'teacher')
    # )
    #
    # user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)

    is_student = models.BooleanField('student_status', default=False)
    is_teacher = models.BooleanField('teacher_status', default=False)
    fullname = models.CharField(max_length=200)
