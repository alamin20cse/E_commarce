from rest_framework import serializers
from .models import users,menu  # তোমার মডেল ফাইল থেকে import

class usersSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = '__all__'  # অথবা ['id', 'email', 'name', 'role'] নির্দিষ্টভাবে


class menuSerializer(serializers.ModelSerializer):
    class Meta:
        model = menu
        fields = '__all__' 

