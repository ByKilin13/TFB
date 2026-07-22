from django.contrib import admin
from .models import Espacio, Reserva

@admin.register(Espacio)
class EspacioAdmin(admin.ModelAdmin):
    list_display = (
        "nombre",
        "capacidad",
        "localizacion",
        "activo"
    )

@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ( #define las columnas que aparecen en el listado de reservas
        "espacio",
        "usuario",
        "fecha",
        "hora_inicio",
        "hora_fin",
        "estado"
    )
    list_filter = ( #filtros para el listado
        "estado",
        "fecha",
        "espacio"
    )

# Register your models here.
