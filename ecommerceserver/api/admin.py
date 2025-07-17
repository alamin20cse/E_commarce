from django.contrib import admin
from .models import users,menu,Cart,Payment

# Register your models here.

@admin.register(users)
class usersAdmin(admin.ModelAdmin):
    list_display=['id','name','email','role']
    
@admin.register(menu)
class menuAdmin(admin.ModelAdmin):
    list_display=['id','name','size','brand','product','image','price','category']

@admin.register(Cart)
class cartAdmin(admin.ModelAdmin):
    list_display = ['id', 'menu_id', 'name', 'email', 'price', 'added_at']
 


@admin.register(Payment)
class paymentAdmin(admin.ModelAdmin):
    list_display=['id','email','price','transactionId','date','status','cartIds','menuItemIds']