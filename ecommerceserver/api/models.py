from django.db import models

# Create your models here.

class users(models.Model):
    email=models.EmailField(max_length=200)
    name=models.CharField(max_length=100)
    role=models.CharField(max_length=50 ,default='user')

# when add the new item
class menu(models.Model):
    name=models.CharField(max_length=200)
    size=models.CharField(max_length=200,default='None')
    brand=models.CharField(max_length=200,default='None')
    product=models.TextField()
    image=models.URLField()
    price=models.DecimalField(max_digits=6,decimal_places=2)
    category=models.CharField(max_length=100)

# if click add button then will add tho ts page
# class Cart(models.Model):
#     menu_id = models.CharField(max_length=100)  # ID from frontend
#     name = models.CharField(max_length=200)
#     image = models.URLField()
#     price = models.DecimalField(max_digits=6, decimal_places=2)
#     email = models.EmailField()
#     added_at = models.DateTimeField(auto_now_add=True)