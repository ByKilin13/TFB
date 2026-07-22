from django.urls import path
from .views import ListaEspaciosView, ListaCrearReservasView

urlpatterns = [
    path(
        "espacios/",
        ListaEspaciosView.as_view(),
        name="lista-espacios"),

    path(
        "reservas/",
        ListaCrearReservasView.as_view(),
        name= "lista-crear-reservas",
    )
]