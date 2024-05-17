#!/bin/bash
chown -R www-data:www-data /var/www/html
find /var/www/html/storage -type d -exec chmod 775 {} \;
find /var/www/html/storage -type f -exec chmod 664 {} \;
php /var/www/html/artisan migrate --force
apache2-foreground