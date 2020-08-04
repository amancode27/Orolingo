from tastypie.resources import ModelResource
from core.models import Note, StudentCourse
from tastypie.authorization import Authorization
from tastypie import fields


class StudentCourseResource(ModelResource):
    class Meta:
        queryset = StudentCourse.objects.all()
        resource_name = 'student_course'
        authorization = Authorization()


class NoteResource(ModelResource):
    student_course = fields.ForeignKey(StudentCourseResource, 'student_course')

    class Meta:
        queryset = Note.objects.all()
        resource_name = 'note'
        authorization = Authorization()
