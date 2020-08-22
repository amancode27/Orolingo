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
    path('api/forum/<slug:slug>/', ForumDetailAPIView.as_view(), name='forum-detail'),
    path('api/forum/<slug:slug>/edit/', ForumUpdateAPIView.as_view(), name='forum-update'),
    path('api/forum/<slug:slug>/delete/', ForumDeleteAPIView.as_view(), name='forum-delete'),
    path('api/post/', PostListAPIView.as_view(), name='post-list'),
    path('api/post/create/', PostCreateAPIView.as_view(), name='post-create'),
    path('api/post/<int:pk>/', PostDetailAPIView.as_view(), name='post-detail'),
    path('api/post/<int:pk>/edit/', PostUpdateAPIView.as_view(), name='post-update'),
    path('api/post/<int:pk>/delete/', PostDeleteAPIView.as_view(), name='post-delete'),
     path('api/thread/', ThreadListAPIView.as_view(), name='user-list'),
    path('api/thread/create/', ThreadCreateAPIView.as_view(), name='thread-create'),
    path('api/thread/<int:pk>/', ThreadDetailAPIView.as_view(), name='thread-detail'),
    path('api/thread/<int:pk>/edit/', ThreadUpdateAPIView.as_view(), name='thread-update'),
    path('api/thread/<int:pk>/delete/', ThreadDeleteAPIView.as_view(), name='thread-delete'),
]
  
# '''
# 1 - Submit email form                         //PasswordResetView.as_view()
# 2 - Email sent success message                //PasswordResetDoneView.as_view()
# 3 - Link to password Rest form in email       //PasswordResetConfirmView.as_view()
# 4 - Password successfully changed message     //PasswordResetCompleteView.as_view()
