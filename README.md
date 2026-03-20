# Desde la carpeta coregol/

wails dev

```

**Primera vez tardará 3-5 minutos** (descarga dependencias de Go y compila).

---

## 📄 GUÍA EN UN SOLO DOCUMENTO

Te la escribo en formato que puedas copiar y pegar:
```

═══════════════════════════════════════════════════════
    INSTALACIÓN PROYECTO COREGOL - MARCADOR DEPORTIVO
═══════════════════════════════════════════════════════

PASO 1: INSTALAR GO
-------------------

1. Ir a: https://go.dev/dl/
2. Descargar: go1.21.x.windows-amd64.msi
3. Ejecutar e instalar
4. Verificar: abrir CMD y escribir: go version

PASO 2: INSTALAR NODE.JS
------------------------

1. Ir a: https://nodejs.org/
2. Descargar: versión LTS (recomendada)
3. Ejecutar e instalar
4. Verificar: abrir CMD y escribir: node --version

PASO 3: INSTALAR WAILS
----------------------

Abrir CMD como ADMINISTRADOR y ejecutar:

> go install github.com/wailsapp/wails/v2/cmd/wails@latest

Verificar:

> wails version

PASO 4: CLONAR PROYECTO
-----------------------

> cd C:\dev
> git clone https://github.com/TuUsuario/prj-flet.git
> cd prj-flet\coregol

PASO 5: INSTALAR DEPENDENCIAS
-----------------------------

> cd frontend
> npm install
> cd ..

PASO 6: EJECUTAR
----------------

> wails dev

¡Esperar 3-5 minutos la primera vez!
Se abrirá la aplicación automáticamente.

═══════════════════════════════════════════════════════
NOTAS:

- Si falla wails, reiniciar la terminal
- Si falla npm install, verificar conexión a internet
- Primera ejecución tarda más (descarga dependencias)
  ═══════════════════════════════════════════════════════
