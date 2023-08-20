# Mi Aplicación Podcast

Bienvenido a la aplicación Podcast, desarrollada utilizando tecnologías modernas como React, Vite, Tailwind CSS, React Router DOM, DOMPurify y TypeScript. Esta aplicación te permite explorar y descubrir podcasts interesantes.

## Cómo Ejecutar la Aplicación

### Modo Desarrollo

En el modo de desarrollo, puedes trabajar y depurar la aplicación sin preocuparte por la optimización de activos.

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en el directorio del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:
```bash
   npm install
```
4. Luego, inicia el servidor de desarrollo
```bash
   npm run dev
```
5. Abre tu navegador y accede a http://localhost:5173

### Modo Produccón

En el modo producción , los activos se optimizan y se sirven de manera eficiente para los usuarios finales.
1. Clona este repositorio en tu máquina local.
2. Abre una terminal en el directorio del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:
 ```bash
   npm install
```
4. Luego compila la aplicación para producción:
```bash
npm run build
```
5. Después de compilar, puedes iniciar un servidor estático para servir la aplicación:
```bash
npm install -g serve # Instala el paquete serve globalmente
serve dist           # Sirve la aplicación compliada en http://localhost:5000
```


## Cómo Ejecutar las pruebas Cypress
Este proyecto incluye pruebas de extremo a extremo utilizando Cypress. Para ejecutar las pruebas:

Asegúrate de haber seguido los pasos anteriores para instalar las dependencias.

Abre una terminal en el directorio del proyecto.

1. Ejecuta el siguiente comando para iniciar el servidor de desarrollo:
```bash
npm run dev
```
2. En otra terminal, abre la interfaz de Cypress:
```bash
npx cypress open
```
3. Accede a la interfaz y elige el navegador donde se realizarán las pruebas.

