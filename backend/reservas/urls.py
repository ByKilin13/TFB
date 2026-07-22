from django.urls import path
from .views import ListaEspaciosView

urlpatterns = [
    path(
        "espacios/",
        ListaEspaciosView.as_view(),
        name="lista-espacios")
]