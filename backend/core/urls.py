from django.urls import path, include
from .views import *
from rest_framework import routers                    # add this
router = routers.DefaultRouter()                      # add this
router.register(r'users', UserView, 'core')
router.register(r'students', StudentView, 'core')
router.register(r'courses',CourseView, 'core')
router.register(r'assignments', AssignmentView, 'core')
router.register(r'feedback', FeedbackView, 'core')

urlpatterns = [
    path('current_user/', current_user),
    path('', include(router.urls)),
    path('<int:pk>/', include(router.urls)), 
    path('oauth/login/', SocialLoginView.as_view()), 
    path('oauth/', include('rest_framework_social_oauth2.urls')),
    path('api/forum/', ForumListAPIView.as_view(), name='forum-list'),
    path('api/forum/create/', ForumCreateAPIView.as_view(), name='forum-create'),
    path('api/forum/<int:id>/', ForumDetailAPIView.as_view(), name='forum-detail'),
    path('api/forum/<int:id>/edit/', ForumUpdateAPIView.as_view(), name='forum-update'),
    path('api/forum/<int:id>/delete/', ForumDeleteAPIView.as_view(), name='forum-delete'),
    path('api/payment/save-stripe-info/', save_stripe_info, name = 'stripe-info')
]
  
# '''
# 1 - Submit email form                         //PasswordResetView.as_view()
# 2 - Email sent success message                //PasswordResetDoneView.as_view()
# 3 - Link to password Rest form in email       //PasswordResetConfirmView.as_view()
# 4 - Password successfully changed message     //PasswordResetCompleteView.as_view()
