FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
        libzip-dev \
        zip \
        unzip \
        default-mysql-client \
    && docker-php-ext-install pdo_mysql zip

RUN a2enmod rewrite

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copiar los archivos de la aplicación al contenedor
COPY . /var/www/html

# Instalar dependencias de PHP con Composer
RUN composer install --no-interaction --no-plugins --no-scripts --prefer-dist

# Cambiar el DocumentRoot a la carpeta public de Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -i 's|/var/www/html|${APACHE_DOCUMENT_ROOT}|g' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's|/var/www/html|${APACHE_DOCUMENT_ROOT}|g' /etc/apache2/apache2.conf
RUN sed -i 's|/var/www/html|${APACHE_DOCUMENT_ROOT}|g' /etc/apache2/conf-available/*.conf

# Establecer permisos de directorio
RUN chown -R www-data:www-data /var/www/html \
    && find /var/www/html/storage -type d -exec chmod 775 {} \; \
    && find /var/www/html/storage -type f -exec chmod 664 {} \;

# Exponer el puerto 80
EXPOSE 80

COPY entrypoint.sh /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]