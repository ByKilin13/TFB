from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
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

class CancelarReservaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, reserva_id):
        reserva = get_object_or_404 (Reserva, id=reserva_id, usuario=request.user)
        if reserva.estado == "cancelada":
            return Response(
                {"mensaje":"La reserva ya estaba cancelada"},
                status = status.HTTP_400_BAD_REQUEST
                )
        reserva.estado = "cancelada"
        reserva.save()
        return Response(
            {"mensaje":"Reserva cancelada correctamente"},
            status = status.HTTP_200_OK
        )

# Create your views here.
