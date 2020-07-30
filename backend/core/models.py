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


class Language(models.Model):
    name = models.CharField(max_length=200)


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key = True)
    langauges_learnt = models.ManyToManyField(Language, related_name="knowing_students")
    languages_to_learn = models.ManyToManyField(Language, related_name="learning_students")


class Trainer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key = True)
    languages_known = models.ManyToManyField(Language, related_name="knowing_teachers")


class Course(models.Model):
    name = models.CharField(max_length=500)
    students = models.ManyToManyField(Student, related_name='courses', through='StudentCourse')
    trainers = models.ManyToManyField(Trainer, related_name='courses')


class StudentCourse(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    completed_percent = models.IntegerField(default=True)
    startdate = models.DateField(auto_now_add=True)
    enddate = models.DateField()


class Assignment(models.Model):
    uid = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    submitted_on = models.DateTimeField()
