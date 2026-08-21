from django.urls import path
from .views import ListaEspaciosView, ListaCrearReservasView, CancelarReservaView, RegistroView
from rest_framework.authtoken.views import obtain_auth_token

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
    ),
    path(
        "login/",
        obtain_auth_token,
        name="login-token",
    ),
    path(
        "registro/",
        RegistroView.as_view(),
        name="registro",
    )
]