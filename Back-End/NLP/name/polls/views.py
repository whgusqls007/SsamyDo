import re
from django.http import HttpResponse
from django.shortcuts import render
import json

# Create your views here.
def index(request):
    body = json.loads(request.body.decode("utf-8"))
    print(body)

    return HttpResponse("Hello, world. You're at the polls index.")
