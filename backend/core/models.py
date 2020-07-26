from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # USER_TYPE_CHOICES = (
    #     (1, 'student')
    #     (2, 'teacher')
    # )
    #
    # user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)

    is_student = models.BooleanField('student_status', default=False)
    is_trainer = models.BooleanField('trainer_status', default=False)
    fullname = models.CharField(max_length=200)
