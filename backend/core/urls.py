from django.urls import path, include
from .views import current_user, UserList, UserView
from rest_framework import routers                    # add this

router = routers.DefaultRouter()                      # add this
router.register(r'users', UserView, 'core')

urlpatterns = [
    path('current_user/', current_user),
    path('', include(router.urls)),
    path('<int:pk>/', include(router.urls)),
]
