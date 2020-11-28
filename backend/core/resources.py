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
        filtering = {
            'user':ALL
        }

class LanguageResource(ModelResource):
    # trainers = fields.ToManyField(TrainerResource, 'trainers')

    class Meta:
        queryset = Language.objects.all()
        authorization = Authorization()
        filtering = {
            'name': ALL
        }

class StudentResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user', full=True)
    languages_learnt = fields.ToManyField(LanguageResource, 'languages_learnt')
    languages_to_learn = fields.ToManyField(LanguageResource, 'languages_to_learn')

    class Meta:
        allowed_methods = ['get' , 'put' ,'patch' , 'post']
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
            'student': ALL,
            'course': ALL,
            'completed_percent':ALL
        }

class MultipartResource(object):
    def deserialize(self, request, data, format=None):
        if not format:
            format = request.META.get('CONTENT_TYPE', 'application/json')
        if format == 'application/x-www-form-urlencoded':
            return request.POST
        if format.startswith('multipart'):
            data = request.POST.copy()
            data.update(request.FILES)
            return data
        return super(MultipartResource, self).deserialize(request, data, format)

class NoteResource(MultipartResource,ModelResource):
    course = fields.ForeignKey(CourseResource, 'course')

    class Meta:
        queryset = Note.objects.all()
        resource_name = 'note'
        authorization = Authorization()
        filtering = {
            "course":ALL
        }

class AssignmentResource(MultipartResource,ModelResource):
    course = fields.ForeignKey(CourseResource, 'course')
    class Meta:
        allowed_methods = ['get' , 'put' ,'patch' ,'delete' ,'post']
        queryset = Assignment.objects.all()
        resource_name = 'assignments'
        authorization = Authorization()
        filtering = {
            "course":ALL
        }


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
        filtering = {
            "course":ALL,
            "student":ALL
        }

# class LanguageTrainerResource(ModelResource):
#     trainer = fields.ForeignKey(TrainerResource, 'trainer')
#     language = fields.ForeignKey(LanguageResource, 'language')

#     class Meta:
#         queryset = LanguageTrainer.objects.all()
#         resource_name = 'language_trainer'
#         authorization = Authorization()
#         filtering = {
#             'trainer': ALL
#         }
class VideosResource(MultipartResource,ModelResource):
    course = fields.ForeignKey(CourseResource, 'course')
    class Meta:
        allowed_methods = ['get' , 'put' ,'patch' ,'delete' ,'post']
        queryset = Videos.objects.all()
        resource_name = 'videos'
        authorization = Authorization()
        filtering = {
            "course":ALL
        }

class TellUsResource(ModelResource):
    class Meta:
        allowed_methods = ['get' , 'put' ,'patch' ,'delete' ,'post']
        queryset = TellUs.objects.all()
        resource_name = 'tellus'
        authorization = Authorization()