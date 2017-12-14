# nodepop
API de soporte para aplicación de venta de segunda mano.

## Procedimiento de preparacion entorno

Ejecutamos los siguientes comandos para instalar node y express.

~~~
npm init

express --ejs --git

npm install

// Probamos a arrancar el servidor express
npm start
~~~

Ejecutamos los siguientes comandos para instalar mongoose

~~~
npm install mongoose --save
~~~

Ejecutamos el siguiente comando para instalar la autenticacion
~~~
npm i jsonwebtoken
~~~

Instalamos la libreria para hashear las passwords
~~~
npm install sha.js
~~~

## Procedimiento para preparar la aplicación

Primero ejecutar la instalacion de los paquetes
~~~
npm install
~~~

Segundo: Arrancar mongodb en el servidor.
~~~
mongod --dbpath ./data/db --directoryperdb
~~~

Segundo: Ejecutar la instalacion de la base de datos
~~~
npm run installDB
~~~

## Procedimiento para arrancar la aplicación

Primero ejecutar la instalacion de los paquetes
~~~
npm run start
~~~


## Funcionalidad

### Usuarios

Los usuarios se podran dar de alta llamanado a /user mediante POST y pasar en el body (name, email, password)

### Anuncios

Se podran hacer peticiones de anuncios llamando a /ads
Este metodo acepta los siguientes parametros:
    name: pudiendo indicar la cadena a buscar desde el comienzo
-->    tags: nombre de los tags a filtrar


