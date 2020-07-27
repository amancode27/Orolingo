
# backend/urls.py

from django.contrib import admin
from django.urls import path, include                 # add this
# from core import views, urls                            # add this
from rest_framework_jwt.views import obtain_jwt_token # added for jwts

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('core.urls')),                #added this               # add this
    path('token-auth/', obtain_jwt_token),             # added for jwts
]
