# google-spreadsheet-api

[![Build Status](https://travis-ci.org/meetupjs-ar/google-spreadsheet-api.svg?branch=master)](https://travis-ci.org/meetupjs-ar/google-spreadsheet-api)

Microservicio que devuelve un JSON con los datos de una hoja de una Google Spreadsheet

[google-spreadsheet-api](http://spreadsheet-api.now.sh/)

## Como funciona

> Nota: Para usar una Google Spreadsheet como base de datos, es necesario crear una planilla y "Publicarla en la web", pasos que se pueden seguir [en este link](https://support.google.com/docs/answer/37579)

-   Usa [gsheets](https://github.com/interactivethings/gsheets) para obtener los datos de la planilla
-   Usa [memory-cache](https://github.com/ptarjan/node-cache) para almacenar los resultados por un tiempo determinado (indicado por configuración), para que no se estén haciendo pedidos todo el tiempo

## Desarrollo

> Antes de empezar, duplicar el archivo `.env-template`, nombrarlo como `.env` y reemplazar por los valores que se necesiten

```bash
npm install
npm run dev
```

## Licencia

MIT
