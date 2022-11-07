from django.contrib import admin

# Register your models here.
from .models import User, Messages # Added by me

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email')

class  MessagesAdmin(admin.ModelAdmin):
   list_display = ('username', 'likes', 'timestamp')


admin.site.register(User, UserAdmin)
admin.site.register(Messages, MessagesAdmin)
