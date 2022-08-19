from django.urls import path
from . import views

app_name="nlp"

urlpatterns = [
    path('', views.preprocess),
    path('todo/', views.make_todo),
]
