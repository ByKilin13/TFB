from rest_framework import serializers
from .models import Espacio, Reserva
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class RegistroSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(
        write_only = True,
        min_length = 6
    )
    class Meta:
        model = User

        fields = [
            "username",
            "email",
            "password"
        ]

    def validate_username(self, username):
        if User.objects.filter(username__iexact=username).exists():
            raise serializers.ValidationError("Ya existe una cuenta con este usuario")
        return username

    def validate_email(self, email):
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError("Ya existe una cuenta con este email")
        return email

    def create(self, validated_data):
        usuario = User.objects.create_user(
            username= validated_data["username"],
            email= validated_data["email"],
            password= validated_data["password"]
        )
        return usuario

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

class ReservaSerializer(serializers.ModelSerializer):
    nombre_espacio = serializers.CharField(
        source = "espacio.nombre",
        read_only = True
    )
    nombre_usuario = serializers.CharField(
        source = "usuario.username",
        read_only = True
    )

    class Meta:
        model = Reserva

        fields = [
            "id",
            "usuario",
            "nombre_usuario",
            "espacio",
            "nombre_espacio",
            "fecha",
            "hora_inicio",
            "hora_fin",
            "estado",
        ]
        read_only_fields = [
            "usuario",
            "estado"
        ]
    def create(self, validated_data): #crear reservas
        reserva = Reserva(**validated_data) #los asteriscos son para elegir todos los datos

        try:
            reserva.full_clean() #ejecuta las validaciones del modelo
            reserva.save()

        except ValidationError as error:
            raise serializers.ValidationError({
            "error": error.messages
        })
        
        return reserva