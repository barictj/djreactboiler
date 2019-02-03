from django.db import models
# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid



class CustomUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True, primary_key=True)
    #The following are examples of additional fields
    #git = models.CharField(max_length=200, null=True)
    #homepage = models.CharField(max_length=250, null=True)
    
    def __str__(self):
        return str(self.username)
    # Returns username as a title string    

