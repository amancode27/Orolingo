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

    def __str__(self):
        return self.name;


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key = True)
    langauges_learnt = models.ManyToManyField(Language, related_name="knowing_students", blank=True)
    languages_to_learn = models.ManyToManyField(Language, related_name="learning_students", blank=True)


class Trainer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key = True)
    languages_known = models.ManyToManyField(Language, related_name="knowing_teachers", blank=True)


class Course(models.Model):
    name = models.CharField(max_length=500)
    students = models.ManyToManyField(Student, related_name='courses', through='StudentCourse')
    trainers = models.ManyToManyField(Trainer, related_name='courses')
    def __str__(self):
        return self.name 

class StudentCourse(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    completed_percent = models.IntegerField(default=True)
    startdate = models.DateField(auto_now_add=True)
    enddate = models.DateField()


class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=500, null=True)


class StudentAssignment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    last_submitted_on = models.DateTimeField()
    passed = models.BooleanField(default=False)


class Note(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    student_course = models.ForeignKey(StudentCourse, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
