# Nodepop
API para aplicación de compra/venta de artículos de segunda mano.

## Funcionalidad

### Usuarios

Los usuarios se podrán dar de alta y autenticarse

* Método /users/register método POST que recibe en el body (name, email, password) para dar de alta un usuario.

* Método /users/authenticate método POST que recibe email y password.

### Anuncios

Método /ads Se podrán hacer peticiones de anuncios y filtrar de la siguiente manera

* Este método acepta los siguientes parámetros:
    * name: pudiendo indicar la cadena a buscar desde el comienzo
    * tags: nombre de los tags a filtrar
    * sell: indica si el artículo se vende o se compra (true o false respectivamente)
    * price: se podrá filtrar por un único precio o por un rango indicándolo de las siguientes formas:
        * 50- precio como mínimo 50€ o igual
        * -100 precio como máximo 100€ o igual
        * 50-100 precio entre 50 y 100 o iguales.
    * start: indica cuantos artículos saltarse.
    * limit: límite de registros a devolver.
    * sort: ordenación posible por name, tags, sell, price

Método /ads/tags Devolverá el conjunto de tags de todos los registros

## Procedimiento de preparación de la aplicación

Al descargar la aplicación será necesario seguir estos pasos para poder ejecutarla.

1. Primero ejecutar la instalación de los paquetes
~~~
$ npm install
~~~

2. Arrancar el servidor mongodb.
~~~
$ mongod --dbpath <ruta_bbdd> --directoryperdb
~~~

3. Ejecutar la instalación de la base de datos para crear la bbdd por primera vez o regenerar los datos por defecto
~~~
$ npm run installDB
~~~

## Procedimiento para arrancar la aplicación en producción

Para poder arrancar la aplicación en producción será necesario copiar el archivo .env.example a .env y repasar la configuración.

1. Arrancar el servidor mongodb.
~~~
$ mongod --dbpath <ruta_bbdd> --directoryperdb
~~~

2. Ejecutar la aplicación.
~~~
$ npm run start
~~~

NOTA: Si se quisiera ejecutar la aplicación en cluster será necesario ejecutar:
~~~
$ npm run cluster
~~~