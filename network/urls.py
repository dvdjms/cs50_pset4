
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("profile/<str:username>", views.profile, name="profile"),
    

    # API Routes
    path("postmessage/message", views.message_post, name="message-post"),
    path("getmessage/message", views.message_get_all, name="message-get"),
    path("profile/getmessage/message", views.message_get_user, name="message-get-user"),
    path("profile/message/<str:username>", views.message_get_user, name="message-get")
    #path("profile/<str:username>", views.profile, name="profile")
]



