from django.contrib import admin
from .models import users,menu

# Register your models here.

@admin.register(users)
class usersAdmin(admin.ModelAdmin):
    list_display=['id','name','email','role']
    
@admin.register(menu)
class menuAdmin(admin.ModelAdmin):
    list_display=['id','name','size','brand','product','image','price','category']