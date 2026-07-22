from django.urls import path
from .views import ListaEspaciosView, ListaCrearReservasView, CancelarReservaView

urlpatterns = [
    path(
        "espacios/",
        ListaEspaciosView.as_view(),
        name="lista-espacios"),

    path(
        "reservas/",
        ListaCrearReservasView.as_view(),
        name= "lista-crear-reservas",
    ),
    path(
        "reservas/<int:reserva_id>/cancelar/",
        CancelarReservaView.as_view(),
        name= "cancelar-reserva"
    )
]