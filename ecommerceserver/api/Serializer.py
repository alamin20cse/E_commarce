from rest_framework import serializers
from .models import users,menu,Cart,Payment# তোমার মডেল ফাইল থেকে import

class usersSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = '__all__'  # অথবা ['id', 'email', 'name', 'role'] নির্দিষ্টভাবে


class menuSerializer(serializers.ModelSerializer):
    class Meta:
        model = menu
        fields = '__all__' 

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'




class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
