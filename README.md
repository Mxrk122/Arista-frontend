
# Arista prueba técnica UI

Este repositorio contiena la parte 1 del ejercicio.

## ¿Cómo desplegar?
1. Clonar el repositorio 

## Depliegue

1. Clonar el repositorio
2. Ejecutar:

```bash
  dotnet watch run
```
(watch permite actualizar al detectar cambios en el código)


## Información de desarrollo

Utilicé el modelo de web app por defecto de dotnet para la estructura del proyecto.

En el código se encuentran comentarios sobre el funcionamiento. Pero podría resumirlo en que: 
1. Utilicé características ya incluidas en HTML 5 para verificar la información. Siendo patterns la más destacable para email, teléfono y código postal.
2. Para campos especiales como email, teléfono decidí añadir una verificación extra ejecutada en javascript.
3. Al terminar la validación (el código que está en wwwroot/js/validation.js) se hace la solicitud POST a:
```bash
  localhost:5183/api/miinfo/mi-info
```
4. El resultado del API se revisa en consola. (ctrl + shift + i)
Esta ruta se debe modificar en caso de que el API estuviera corriendo en otro puerto