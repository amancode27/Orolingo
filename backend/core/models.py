from django.db import models
from django.contrib.auth.models import AbstractUser
from django.template.defaultfilters import slugify
from django.utils.text import Truncator
from django.utils.timezone import now



class User(AbstractUser):
    # USER_TYPE_CHOICES = (
    #     (1, 'student')
    #     (2, 'teacher')
    # )
    #
    # user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)

    is_student = models.BooleanField('student_status', default=False)
    is_trainer = models.BooleanField('trainer_status', default=False)
    #image_url = models.CharField('user_image', max_length=500)   #commented this because i was not able to login ~ Awais
    fullname = models.CharField(max_length=200)

    
    def __str__(self):
        return str(self.fullname)



############### Trainer # Language # LanguageTrainer ###############

class Trainer(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    #languages_known = models.ManyToManyField(Language, related_name="knowing_teachers", blank=True)

    # def __str__(self):
    #     return self.user

class Language(models.Model):
    name = models.CharField(max_length=200, null=True)
    # trainers = models.ManyToManyField(
    #     Trainer, related_name='languages',through='LanguageTrainer')

    def __str__(self):
        return str(self.name)

# class LanguageTrainer(models.Model):
#     trainers = models.ForeignKey(Trainer, on_delete=models.CASCADE)
#     languages = models.ForeignKey(Language,on_delete=models.CASCADE)


############### Student # Course # StudentCourse ###############

class Student(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    languages_learnt = models.ManyToManyField(
        Language, related_name="knowing_students", blank=True)
    languages_to_learn = models.ManyToManyField(
        Language, related_name="learning_students", blank=True)

    # def __str__(self):
    #     return self.user


class Course(models.Model):
    name = models.CharField(max_length=200, null=True)
    language = models.ForeignKey(Language, on_delete=models.CASCADE, null=True)
    students = models.ManyToManyField(
        Student, related_name='courses', through='StudentCourse')
    trainer = models.ForeignKey(Trainer, on_delete=models.CASCADE, null=True)
    startdate = models.DateField(null=True)
    enddate = models.DateField(null=True)
    description = models.TextField(default="Give a brief description about the course")
    cost = models.IntegerField(null=True)

    def __str__(self):
        return str(self.name)


class StudentCourse(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    completed_percent = models.IntegerField(default=0)
    forum_cnt = models.IntegerField(default=0)
    # startdate = models.DateField(auto_now_add=True)
    # enddate = models.DateField(null=True)


############### Assignment # StudentAssignment ###############

class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    topic = models.CharField(max_length=500, null=True)
    description = models.TextField(null=True)
    created_at = models.DateField(auto_now_add=True,null=True)
    deadline = models.DateField(null=True)
    pdf = models.FileField(null=True,blank=True)
    # def __str__(self):
    #     return self.course


class StudentAssignment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    last_submitted_on = models.DateTimeField()
    passed = models.BooleanField(default=False)

    # def __str__(self):
    #     return self.student


############### FEEDBACK ###############
RATING_CHOICES =(
    (1,'Very Bad'),
    (2,'bad'),
    (3,'average'),
    (4, 'Good'),
    (5, 'Excellent'),
)
class Feedback(models.Model):
    student = models.ForeignKey(Student,on_delete = models.CASCADE)
    course = models.ForeignKey(Course,on_delete = models.CASCADE)
    title =  models.CharField(max_length= 50)
    body = models.TextField()
    rating = models.IntegerField(choices=RATING_CHOICES)
    

 
class Note(models.Model):
    topic = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateField(auto_now_add=True,null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE,null=True)
    pdf = models.FileField(null=True,blank =True)
    def __str__(self):
        return str(self.topic)


class Zoom(models.Model):
    user = models.OneToOneField(
        Trainer, on_delete=models.CASCADE, primary_key=True)
    idAccount = models.CharField(max_length=255, default=None)
    meetingId = models.CharField(max_length=255, default=None)
    personalMeetingUrl = models.CharField(max_length=255, default=None)

class Forum(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField(max_length=1000)
    creator = models.CharField(max_length=50, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    student_course = models.ForeignKey(StudentCourse, on_delete=models.CASCADE,null = True)
    student = models.ForeignKey(Student,on_delete=models.CASCADE,null = True)
    trainer = models.ForeignKey(Trainer, on_delete=models.CASCADE,null = True)
    #last_activity = models.CharField(max_length = 50, null=True)

    def __str__(self):
        return str(self.title)

class Videos(models.Model):
    topic = models.CharField(max_length=200)
    description = models.TextField(null=True)
    pdf = models.FileField(upload_to='videos/') #pdf name is used for using the same upload modal
    course = models.ForeignKey(Course, on_delete=models.CASCADE,null=True)
    created_at = models.DateField(auto_now_add=True,null=True)

    class Meta:
        verbose_name = 'video'
        verbose_name_plural = 'videos'
         
    def __str__(self):
        return str(self.topic)

class TellUs(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    lang_to_learn = models.CharField(max_length=100)
    purpose = models.CharField(max_length=100)
    lang_already = models.CharField(max_length=100)
    preference = models.CharField(max_length=100)
    profile = models.CharField(max_length=100)

    def __str__(self):
        return self.name