from tastypie.resources import ModelResource, ALL
from core.models import *
from tastypie.authorization import Authorization
from tastypie import fields


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        authorization = Authorization()
        excludes = ['password']
        allowed_methods = ['get']

class TrainerResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user', full=True)
    
    class Meta:
        queryset = Trainer.objects.all()
        authorization = Authorization()

class LanguageResource(ModelResource):
    trainers = fields.ToManyField(TrainerResource, 'trainers')

    class Meta:
        queryset = Language.objects.all()
        authorization = Authorization()
        filtering = {
            'trainers': ALL
        }

class StudentResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user', full=True)
    languages_learnt = fields.ToManyField(LanguageResource, 'languages_learnt')
    languages_to_learn = fields.ToManyField(LanguageResource, 'languages_to_learn')

    class Meta:
        queryset = Student.objects.all()
        authorization = Authorization()


class CourseResource(ModelResource):
    trainer = fields.ForeignKey(TrainerResource, 'trainer', full=True)
    language = fields.ForeignKey(LanguageResource, 'language', full=True)

    class Meta:
        queryset = Course.objects.all()
        authorization = Authorization()
        filtering = {
            'language': ALL,
            'trainer': ALL
        }

class StudentCourseResource(ModelResource):
    student = fields.ForeignKey(StudentResource, 'student')
    course = fields.ForeignKey(CourseResource, 'course', full=True)

    class Meta:
        queryset = StudentCourse.objects.all()
        resource_name = 'student_course'
        authorization = Authorization()
        filtering = {
            'student': ALL
        }


class NoteResource(ModelResource):
    student_course = fields.ForeignKey(StudentCourseResource, 'student_course')

    class Meta:
        queryset = Note.objects.all()
        resource_name = 'note'
        authorization = Authorization()

class AssignmentResource(ModelResource):
    course = fields.ForeignKey(CourseResource, 'course')
    students = fields.ToManyField(StudentResource,'student')

    class Meta:
        queryset = Assignment.objects.all()
        resource_name = 'assignments'
        authorization = Authorization()


class StudentAssignmentResource(ModelResource):
    student = fields.ForeignKey(StudentResource, 'student')
    assignment = fields.ForeignKey(AssignmentResource, 'assignment')

    class Meta:
        queryset = StudentAssignment.objects.all()
        resource_name = 'student_assignment'
        authorization = Authorization()

class FeedbackResource(ModelResource):
    student = fields.ForeignKey(StudentResource, 'student')
    course = fields.ForeignKey(CourseResource,'course')

    class Meta:
        queryset = Feedback.objects.all()
        resource_name = 'feedback'
        authorization = Authorization()

class LanguageTrainerResource(ModelResource):
    trainer = fields.ToManyField(TrainerResource, 'trainer')
    languages_to_teach = fields.ToManyField(LanguageResource, 'languages')

    class Meta:
        queryset = LanguageTrainer.objects.all()
        resource_name = 'language_trainer'
        authorization = Authorization()
