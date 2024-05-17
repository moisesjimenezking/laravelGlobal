#!/bin/bash
set -e

# Esperar a que MySQL esté listo
while ! mysqladmin ping -h"db" --silent; do
    sleep 1
done

# Instalar dependencias de Composer
composer install --no-interaction --no-plugins --no-scripts --prefer-dist

# Ejecutar migraciones
php artisan migrate --force

# Iniciar Apache en modo foreground
exec apache2-foreground