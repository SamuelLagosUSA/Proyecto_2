# Visualizador de Regresion Lineal

Un proyecto interactivo sencillo construido con *Kotlin (backend)* y *HTML/CSS/JavaScript (frontend)* que realiza *regresión lineal* a partir de puntos proporcionados por el usuario.  
La aplicación visualiza la línea de mejor ajuste y muestra la fórmula de regresión correspondiente.

---

## Estructura del Proyecto

```plaintext
regresion-lineal-ui/
├── index.html           # Página web principal
├── style.css            # Estilos del frontend
├── script.js            # Lógica JavaScript para graficar y manejar la UI
└── src/
    └── main/
        └── kotlin/
            └── LinearRegression.kt   # Lógica central de regresión (cálculo de pendiente e intercepto)
```

## Funcionalidades

- Agregar puntos manualmente a través de la interfaz.  
- Mostrar un gráfico de dispersión interactivo.  
- Calcular la pendiente (m) y el intercepto (b) usando el método de mínimos cuadrados.  
- Dibujar la línea de tendencia.  
- Mostrar la ecuación de la recta \( y = mx + b \).  
- Limpiar y reiniciar el gráfico.  
- Interfaz web simple y responsiva.  

---

## Como Funciona

### 1. Frontend

- El usuario ingresa puntos mediante campos de formulario o haciendo clic en el canvas.  
- El archivo JavaScript (script.js) recopila y envía estos datos para el cálculo de regresión.  
- La línea de regresión y los puntos se dibujan usando el elemento <canvas> de HTML.  

### 2. Backend (Kotlin)

El script en Kotlin calcula los parámetros de regresión usando el método de mínimos cuadrados:

$$
m = \frac{N \sum(xy) - \sum x \sum y}{N \sum(x^2) - (\sum x)^2}
$$

$$
b = \frac{\sum y - m \sum x}{N}
$$


Donde:  
- \( N \) es el número de puntos  
- \( x, y \) son los valores de coordenadas  
- \( m \) es la pendiente  
- \( b \) es el intercepto  

El backend retorna \( m \) y \( b \) al frontend para renderizar la línea de regresión y la fórmula.

---

## Requisitos

- *Kotlin* 1.9+  
- *Gradle* (si se usa Kotlin como servicio o módulo backend)  
- *Navegador* (Chrome/Firefox actualizados para pruebas de UI)  
- *Opcional:* Node.js (para servir el frontend localmente)
- *JDK* 17.0.16

---

## Ejecutar el Proyecto

### Opción 1: Ejecucion Local del HTML

1. Abre la carpeta del proyecto.  
2. Ubica index.html.  
3. Haz doble clic o ábrelo en tu navegador.  
4. Ahora puedes agregar puntos de forma interactiva y ver la línea de regresion.

### Opcion 2: Backend en Kotlin

Si deseas que la lógica en Kotlin se ejecute dinámicamente (por ejemplo, mediante una API REST):

1. Abre el proyecto Kotlin en *IntelliJ IDEA* o tu IDE preferido.  
2. Compila y ejecuta LinearRegression.kt.  
3. Ajusta script.js para obtener los resultados de regresión desde tu backend local (si aplica).  


### Opcion 3: Consola
1. Descargar el archivo .zip que se encuentra en la entrega del teams
2. Guardar en alguna locacion.
3. Estar en la ubicacion de la carpeta en la consola
4. Correr el archivo con .\gradlew run  (ejemplo de la locacion PS C:\Users\Nicolas\downloads\regresion-lineal-ui> )
5. Abrir en http://localhost:8085/

---

## Ejemplo de Uso

1. Agrega puntos como *(1,2), *(2,3)*, *(3,5)**.  
2. La app calcula la recta de mejor ajuste.  
3. La fórmula aparece como algo similar a:

\[
y = 1.5x + 0.2
\]
