<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Pasos para levantar la app


1. clonar el repositorio
``` https://github.com/WillySolarte/ol_prueba_back.git ```

2. Abrir el proyecto clonado con visual studio code
3. Copia el archivo de ejemplo .env.template y renómbralo a .env
4. Abre .env y modifica las variables según tu entorno, por ejemplo, configura las credenciales de tu base de datos PostgreSQL, puerto, etc
5. Asegurate de tener Postgres activo y la base de datos del proyecto creada con los datos semilla de anteriores retos
6. Abre la consola powershel del proyecto y construye la imagen de Docker con el comando
```docker build -t nombre_de_tu_imagen .``` 

# Si usas Docker desktop 

7. Una vez creada la imagen corre el contenedor desde docker desktop y asegurate de proporcionar el puerto 3000

# Si usas la consola

7. Si quiere usar la consola para corre el contenedor Docker ingrese el comando:
 ```docker run -p 3000:3000 --env-file .env nombre_de_tu_imagen``` 
