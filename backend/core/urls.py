from django.urls import path, include
from .views import current_user, UserView, SocialLoginView, StudentView
from rest_framework import routers                    # add this

router = routers.DefaultRouter()                      # add this
router.register(r'users', UserView, 'core')
router.register(r'students', StudentView, 'core')

urlpatterns = [
    path('current_user/', current_user),
    path('', include(router.urls)),
    path('<int:pk>/', include(router.urls)),
    path('oauth/login/', SocialLoginView.as_view()),
    path('oauth/', include('rest_framework_social_oauth2.urls')),
]
