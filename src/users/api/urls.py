from django.urls import path
from . import views

urlpatterns = [
    
    path('user/<pk>/', views.UserDetail.as_view()),
    path('user/', views.UserListView.as_view()),

]