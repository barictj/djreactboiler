from rest_framework import viewsets
from rest_framework.generics import  RetrieveAPIView
from django.contrib.auth.models import AbstractUser

from users.models import CustomUser
from .serializers import UserSerializer

# class ArticleViewSet(viewsets.ModelViewSet):
#     serializer_class = ArticleSerializer
#     queryset = Article.objects.all()


from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)

class UserDetail(RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
class UserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
