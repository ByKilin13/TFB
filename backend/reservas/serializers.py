from rest_framework import serializers
from .models import Espacio

class EspacioSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Espacio

        fields = [
            "id",
            "nombre",
            "descripcion",
            "capacidad",
            "localizacion",
            "activo"
        ]