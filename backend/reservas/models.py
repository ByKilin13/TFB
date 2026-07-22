from django.db import models
from django.conf import settings  #sirve para relacionar reservas con el usuario



class Espacio(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    capacidad = models.PositiveIntegerField(default=1) 
    localizacion = models.CharField(max_length=180, blank=True)   
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class Reserva(models.Model):
    estados = [
        ("activa", "Activa"),
        ("cancelada", "Cancelada")
    ]    
    usuario = models.ForeignKey( #foreignkey indica un usuario a muchas reservas y una reserva un usuario
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT, #impide eliminar usuario si hay reservas en el
        related_name="reservas" #permite hacer consulta de todas las reservas del usuario
    )
    espacio = models.ForeignKey( #foreignkey indica un espacio muchas reservas y una reserva un espacio
        Espacio, 
        on_delete=models.PROTECT,
        related_name="reservas"
    )
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    estado = models.CharField(
        max_length=10,
        choices= estados,
        default="activa"
    )
    def __str__(self):
        return f"{self.espacio.nombre} - {self.fecha}"

