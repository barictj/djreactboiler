from rest_framework import serializers

from users.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # explicitly include other fields as required
        fields = ('username', 'email')



