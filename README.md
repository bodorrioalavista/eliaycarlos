# La caja fuerte de la boda

Web estatica para enviar como juego previo al codigo de una caja fuerte.

## Cambiar el contenido

Abre `script.js` y cambia:

- `finalCode`: el codigo real de la caja fuerte.
- `friends`: los nombres que saldran en los desplegables.
- `quoteQuestions`: las 11 frases y su respuesta correcta.
- `photoQuestions`: las fotos de la segunda prueba y su respuesta correcta.

La respuesta de cada pregunta debe coincidir exactamente con uno de los nombres de `friends`.

## Fotos de la prueba 2

La carpeta `assets` contiene imagenes de ejemplo. Sustituyelas por fotos reales manteniendo el nombre, por ejemplo:

- `assets/foto-01.jpg`
- `assets/foto-02.jpg`
- `assets/foto-03.jpg`
- `assets/foto-04.jpg`

Despues cambia la propiedad `image` en `photoQuestions`, por ejemplo:

```js
image: "assets/foto-01.jpg"
```

Puedes ajustar el recorte con:

- `zoom`: cuanto se acerca la imagen. Prueba valores como `1.3`, `1.7` o `2`.
- `focus`: que parte de la foto se ve. Ejemplos: `"50% 20%"`, `"70% 40%"`.
- `clue`: el texto pequeño de la etiqueta, como `"Zoom"` o `"De espaldas"`.

## Probarla

Puedes abrir `index.html` directamente en el navegador.

## Publicarla gratis

Opciones sencillas:

- GitHub Pages: crea un repositorio, sube estos archivos y activa Pages desde Settings > Pages.
- Netlify: arrastra la carpeta completa a https://app.netlify.com/drop.
- Vercel: importa la carpeta o repositorio como proyecto estatico.

No necesita servidor ni base de datos.
