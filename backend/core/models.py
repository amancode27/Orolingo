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
        return self.fullname


class Trainer(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    #languages_known = models.ManyToManyField(Language, related_name="knowing_teachers", blank=True)

    # def __str__(self):
    #     return self.user

class Language(models.Model):
    name = models.CharField(max_length=200, null=True)
    trainers = models.ManyToManyField(
        Trainer, related_name='languages')

    def __str__(self):
        return self.name

class LanguageTrainer(models.Model):
    trainers = models.ManyToManyField(Trainer, related_name='languagetrainer')
    languages_to_teach = models.ManyToManyField(Language, related_name="knowing_teachers", blank=True)

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

    # def __str__(self):
    #     return self.language


class StudentCourse(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    completed_percent = models.IntegerField(default=0)
    startdate = models.DateField(auto_now_add=True)
    enddate = models.DateField(null=True)


class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    trainer = models.ForeignKey(Trainer, on_delete=models.CASCADE, null=True)
    students = models.ManyToManyField(
        Student, related_name='assignment', through='StudentAssignment')
    name = models.CharField(max_length=500, null=True)

    # def __str__(self):
    #     return self.course


class StudentAssignment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    last_submitted_on = models.DateTimeField()
    passed = models.BooleanField(default=False)

    # def __str__(self):
    #     return self.student


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
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    student_course = models.ForeignKey(StudentCourse, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Forum(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.slug

    def save(self, *args, **kwargs):
        if not self.id:
            # Newly created object, so set slug
            self.slug = slugify(self.name)
        super(Forum, self).save(*args, **kwargs)

class Thread(models.Model):
    name = models.CharField(max_length=255)
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name='threads')
    pinned = models.BooleanField(default=False)
    content = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='threads')
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(default=now)

    class Meta:
        ordering = [
            '-pinned',
            '-last_activity'
        ]

    def __str__(self):
        truncated_name = Truncator(self.name)
        return truncated_name.chars(30)

class Post(models.Model):
    """ Model to represent the post in a thread """
    content = models.TextField()
    thread = models.ForeignKey(
        Thread,
        on_delete=models.CASCADE,
        related_name='posts'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='posts'
    )

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        truncated_content = Truncator(self.content)
        return truncated_content.chars(30)
