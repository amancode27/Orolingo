from tastypie.resources import ModelResource
from core.models import *
from tastypie.authorization import Authorization
from tastypie import fields


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        authorization = Authorization()
        excludes = ['password']
        allowed_methods = ['get']


class StudentResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user')
    
    class Meta:
        queryset = Student.objects.all()
        authorization = Authorization()


class TrainerResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user')
    
    class Meta:
        queryset = Trainer.objects.all()
        authorization = Authorization()


class CourseResource(ModelResource):
    trainers = fields.ToManyField(TrainerResource, 'trainers')

    class Meta:
        queryset = Course.objects.all()
        authorization = Authorization()


class StudentCourseResource(ModelResource):
    student = fields.ForeignKey(StudentResource, 'student')
    course = fields.ForeignKey(CourseResource, 'course')

    class Meta:
        queryset = StudentCourse.objects.all()
        resource_name = 'student_course'
        authorization = Authorization()


class AssignmentResource(ModelResource):
    course = fields.ForeignKey(CourseResource, 'course')

    class Meta:
        queryset = Assignment.objects.all()
        authorization = Authorization()


class StudentAssignmentResource(ModelResource):
    student = fields.ForeignKey(StudentResource, 'student')
    assignment = fields.ForeignKey(AssignmentResource, 'course')

    class Meta:
        queryset = StudentAssignment.objects.all()
        resource_name = 'student_assignment'
        authorization = Authorization()


class NoteResource(ModelResource):
    student_course = fields.ForeignKey(StudentCourseResource, 'student_course')

    class Meta:
        queryset = Note.objects.all()
        resource_name = 'note'
        authorization = Authorization()
