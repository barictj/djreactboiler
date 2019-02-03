from django.contrib import admin

from .models import CustomUser

#Add other models if you want to be able to manipulate the data in the admin portal
# admin.site.register(OtherModel)

admin.site.register(CustomUser)



