from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required # added by me
from django.http import JsonResponse # added by me
import json # added by me
from .models import User, Messages # message added by me
from django.views.decorators.csrf import csrf_exempt



# Function to load index page
def index(request):
    return render(request, "network/index.html")



def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]

        # Ensure username is not blank
        if username == "":
            return render(request, "network/register.html", {
                "message": "Please provide username."
            })

        # Ensure email is not blank
        if email == "":
            return render(request, "network/register.html", {
                "message": "Please provide email."
            })

        # Ensure password is not blank
        if password == "":
            return render(request, "network/register.html", {
                "message": "Please provide password."
            })
        
        # Ensure confirmation is not blank
        if confirmation == "":
            return render(request, "network/register.html", {
                "message": "Please confirm password."
            })

        # Ensure password matches confirmation
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


# Function to load profile page
@login_required
def profile(request, username):
    return render(request, "network/profile.html", {
        "username": username
    })



@csrf_exempt ######################## Query
@login_required
def message_post(request):

    # Composing a new message must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    # Get contents of message
    data = json.loads(request.body)
    message1 = data.get("message", "")

    # Post to database model 'Message'
    message = Messages()
    message.message = message1
    message.username = request.user
    message.save()

    return JsonResponse({"message": "Posted successfully."}, status=201)



# Fetch all messages from Messages model
def message_get_all(request):

    message = Messages.objects.all()
    message = message.order_by("-timestamp").all()
    return JsonResponse([i.serialize() for i in message], safe=False)


def message_get_user(username): # Nothing is showing in argument
    print(username)
    print(username)
    print(username)

    # message = Messages.objects.all()
    message = Messages.objects.filter(username=username)
    
    message = message.order_by("-timestamp")
    print(message)
    return JsonResponse([i.serialize() for i in message], safe=False)


