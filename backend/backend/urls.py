# backend/urls.py

from django.contrib import admin
from django.urls import path, include                 # add this
# from core import views, urls                            # add
from django.contrib.auth import views as auth_views
from rest_framework_jwt.views import obtain_jwt_token  # added for jwts
from django.conf import settings
from core.resources import *
from django.conf.urls.static import static


user_resource = UserResource()
student_resource = StudentResource()
trainer_resource = TrainerResource()
course_resource = CourseResource()
assignment_resource = AssignmentResource()
student_assignment_resource = StudentAssignmentResource() 
note_resource = NoteResource()
student_course_resource = StudentCourseResource()
language_resource = LanguageResource()
feedback = FeedbackResource()
# language_trainer = LanguageTrainerResource()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('core.urls')),  # added this               # add this
    path('token-auth/', obtain_jwt_token),             # added for jwts
    # path('api/auth/oauth/', include('rest_framework_social_oauth2.urls')),
    path('api/', include(note_resource.urls)),
    path('api/', include(student_course_resource.urls)),
    path('api/', include(student_resource.urls)),
    path('api/', include(assignment_resource.urls)),
    path('api/', include(trainer_resource.urls)),
    path('api/', include(course_resource.urls)),
    path('api/', include(student_assignment_resource.urls)),
    path('api/', include(user_resource.urls)),
    path('api/', include(language_resource.urls)),
    path('api/', include(feedback.urls)),
#     path('api/', include(language_trainer.urls)),
    # path('api/auth/oauth/', include('rest_framework_social_oauth2.urls')),
    path('reset_password/',
         auth_views.PasswordResetView.as_view(),
         name="reset_password"),

    path('reset_password_sent/',
         auth_views.PasswordResetDoneView.as_view(),
         name="password_reset_done"),

    path('reset/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(),
         name="password_reset_confirm"),

    path('reset_password_complete/',
         auth_views.PasswordResetCompleteView.as_view(),
         name="password_reset_complete"),


]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# 1 - Submit email form                         //PasswordResetView.as_view()
# 2 - Email sent success message                //PasswordResetDoneView.as_view()
# 3 - Link to password Rest form in email       //PasswordResetConfirmView.as_view()
# 4 - Password successfully changed message     //PasswordResetCompleteView.as_view()
