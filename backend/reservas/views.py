from django.shortcuts import render
from rest_framework import generics
from .models import Espacio
from .serializers import EspacioSerializer

class ListaEspaciosView(generics.ListAPIView):
    serializer_class = EspacioSerializer

    def get_queryset(self):
        return Espacio.objects.filter(activo=True).order_by("nombre")

# Create your views here.
