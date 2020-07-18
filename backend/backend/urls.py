
# backend/urls.py

from django.contrib import admin
from django.urls import path, include                 # add this
from rest_framework import routers                    # add this
from todo import views, urls                            # add this
from rest_framework_jwt.views import obtain_jwt_token # added for jwts 

router = routers.DefaultRouter()                      # add this
router.register(r'todos', views.TodoView, 'todo')     # add this
        
urlpatterns = [
    path('admin/', admin.site.urls),         
    path('auth/',include('todo.urls')),                #added this  
    path('api/', include(router.urls)),                # add this
    path('token-auth/', obtain_jwt_token),             # added for jwts
] 