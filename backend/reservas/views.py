from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Espacio, Reserva
from .serializers import EspacioSerializer, ReservaSerializer

class ListaEspaciosView(generics.ListAPIView):
    serializer_class = EspacioSerializer

    def get_queryset(self):
        return Espacio.objects.filter(activo=True).order_by("nombre")

class ListaCrearReservasView(generics.ListCreateAPIView):
    serializer_class = ReservaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Reserva.objects.filter(usuario = self.request.user).order_by("fecha","hora_inicio")

    def perform_create(self, serliazer):
        serliazer.save(usuario = self.request.user)

# Create your views here.
