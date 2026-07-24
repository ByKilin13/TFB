from django.db import models
from django.conf import settings  #sirve para relacionar reservas con el usuario
from django.core.exceptions import ValidationError #importante para mensajes de errores



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

    def clean(self): #clean valida el objeto antes de enviar
        if self.hora_fin <= self.hora_inicio: #mensaje error de hora
            raise ValidationError ("La hora final debe ser posterior a la inicial")

        reservas_colapsadas = Reserva.objects.filter( #comprueba con todas las reservas si coincide la fecha 
            espacio = self.espacio,
            fecha = self.fecha,
            estado = "activa",
            hora_inicio__lt = self.hora_fin, #hora inicio del objeto ya guardado es menor que la hora final de la reserva por hacer
            hora_fin__gt = self.hora_inicio #hora final del objeto es mayor que la hora inicio de la reserva por hacer
        )
        if self.pk: #esto es para que django no lo compruebe con el mismo objeto que intentamos cambiar, solo afecta a modificaciones
            reservas_colapsadas = reservas_colapsadas.exclude(pk = self.pk)

        if reservas_colapsadas.exists(): #si existe esto es que hay una reserva que colapsa y da error
            raise ValidationError(
                "El espacio ya esta reservado durante ese horario"
            )

        if not self.espacio.activo:
            raise ValidationError("No se puede reservar este espacio, está inactivo")  
    
        

    

