from django.db import models

class Espacios(models.Model):
    nombre = models.CharField(min_length=2, max_length=100)
    descripcion = models.TextField(blank=True)
    capacidad = models.PositiveIntegerField(default=1) 
    localizacion = models.CharField(max_length=180, blank=True)   
    activo = models.BooleanField(default=True)
