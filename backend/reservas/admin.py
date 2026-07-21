from django.contrib import admin
from .models import Espacio

@admin.register(Espacio)
class EspacioAdmin(admin.ModelAdmin):
    list_display = (
        "nombre",
        "capacidad",
        "localizacion",
        "activo"
    )

# Register your models here.
