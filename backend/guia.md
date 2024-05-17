# Manual de Instalación de la Aplicación Laravel

## Requisitos del Sistema
- Docker
- Docker Composer


## Clonar el Repositorio
1. Abre la terminal.
2. Ejecuta el siguiente comando para clonar el repositorio: git clone https://github.com/moisesjimenezking/app_laravel.git

## archivo .env
1. puede crear sua rchivo .en apartir del archivo .env.example puede estotalmente funcional
2. de igual forma el archivo build.sh se encarga de crear el archivo

## iniciar el contenedor
1. Solo aceda al directorio del repositorio
2. Ejecute el siguiente comando: sudo sh build.sh

## Pruebas
1. Abre un navegador web y accede a `http://localhost:9000` para verificar que la aplicación funciona correctamente.

El puerto es relativo ya que si esta ocupado el montara en un puerto superior que este disponible.

## Rutas

>>> GET /users
>>> GET /users?limit=1

Response 
{
    "current_page": 1,
    "data": [
        {
            "id": 1,
            "firstName": "Moises",
            "otherName": "jesus",
            "surname": "jimenez",
            "secondSurname": "sanchez",
            "email": null,
            "identificationType": "cedula",
            "identificationNumber": "v100000",
            "country": "COLOMBIA",
            "area": "tecnologia",
            "state": "AVAILABLE",
            "admissionDate": "2024-01-01",
            "created_at": "2024-05-15T23:02:26.000000Z",
            "updated_at": "2024-05-15T23:02:26.000000Z"
        },
    ],
    "first_page_url": "http://127.0.0.1:8001/users?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "http://127.0.0.1:8001/users?page=1",
    "links": [
        {
            "url": null,
            "label": "&laquo; Previous",
            "active": false
        },
        {
            "url": "http://127.0.0.1:8001/users?page=1",
            "label": "1",
            "active": true
        },
        {
            "url": null,
            "label": "Next &raquo;",
            "active": false
        }
    ],
    "next_page_url": null,
    "path": "http://127.0.0.1:8001/users",
    "per_page": 10,
    "prev_page_url": null,
    "to": 8,
    "total": 8
}

status_http: 200

>>> DELETE /users

Requiere id

Response:
{
    "error": {
        "internalError": "Usuario no encontrado.",
        "message": "Usuario no encontrado."
    },
    "message": "Usuario no encontrado."
}
status_http: 404
O

{
    "message": "Usuario eliminado correctamente"
}
status_http: 201

>>> POST /register

Requiere:
- firstName
- surname
- secondSurname
- country
- identificationType
- identificationNumber
- area
- admissionDate

Opcional:
- otherName

Response
{
    "message": "Usuario creado exitosamente",
    "user": {
        "id": 12,
        "firstName": "jesus",
        "otherName": null,
        "surname": "sanchez",
        "secondSurname": "jimenez",
        "email": "jesus.sanchezjimenez.12@global.com.us",
        "identificationType": "cedula",
        "identificationNumber": "v26602061",
        "country": "Estados Unidoss",
        "area": "recursos humanos",
        "state": "AVAILABLE",
        "admissionDate": "2024-02-01",
        "created_at": "2024-05-16T19:21:37.000000Z",
        "updated_at": "2024-05-16T19:21:37.000000Z"
    }
}
status_http: 201

o 

{
    "error": {
        "internalError": "error firstName: The first name field is required.",
        "message": "Error de validación"
    },
    "message": "Error de validación"
}
status_http: 404

>>> PUT /users

Requiere:
- id

Opcional:
- otherName
- firstName
- surname
- secondSurname
- country
- identificationType
- identificationNumber
- area
- admissionDate

Response:
{
    "message": "Usuario actualizado exitosamente",
    "user": {
        "id": 12,
        "firstName": "juan",
        "otherName": null,
        "surname": "sanchez",
        "secondSurname": "jimenez",
        "email": "jesus.sanchezjimenez.12@global.com.us",
        "identificationType": "cedula",
        "identificationNumber": "v26602061",
        "country": "Estados Unidoss",
        "area": "recursos humanos",
        "state": "UNAVAILABLE",
        "admissionDate": "2024-02-01",
        "created_at": "2024-05-16T19:21:37.000000Z",
        "updated_at": "2024-05-16T19:54:07.000000Z"
    }
}
status_http: 201

O

{
    "error": {
        "internalError": "Error sin datos para modificar.",
        "message": "Error al actualizar el usuario"
    },
    "message": "Error al actualizar el usuario"
}
status_http: 404