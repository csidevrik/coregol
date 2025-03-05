# Proyecto Flutter + Python

Este proyecto implementa una aplicación de escritorio moderna usando Flutter para el frontend y Python para el backend.

## Estructura del Proyecto

```
proyecto/
├── a_front/                    # Frontend con Flutter
│   ├── lib/                    # Código fuente Flutter
│   │   ├── main.dart          # Punto de entrada de Flutter
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── sidebar.dart   # Barra lateral de navegación
│   │   │   └── topbar.dart    # Barra superior
│   │   ├── theme/            # Configuración de temas
│   │   │   └── app_theme.dart # Colores y estilos globales
│   │   └── views/            # Pantallas de la aplicación
│   │       └── home_view.dart # Vista principal
│   └── pubspec.yaml           # Dependencias de Flutter
├── utils/                     # Utilidades compartidas
│   └── logger.py             # Configuración de logging
├── logs/                     # Archivos de log
│   └── app.log              # Registro de la aplicación
└── root.py                  # Script principal de Python
```

## Requisitos Previos

1. **Python 3.8+**
2. **Flutter SDK**
   - [Guía de instalación de Flutter](https://docs.flutter.dev/get-started/install)
   - Después de instalar, ejecuta `flutter doctor` para verificar la instalación

## Configuración del Proyecto

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```

2. Instala las dependencias de Python:

```bash
pip install -r requirements.txt
```

3. Las dependencias de Flutter se instalarán automáticamente al ejecutar la aplicación.

## Ejecutar la Aplicación

Para iniciar la aplicación, simplemente ejecuta:

```bash
python root.py
```

Este comando:

1. Verifica la instalación de Flutter
2. Instala las dependencias necesarias
3. Inicializa el proyecto Flutter si es necesario
4. Lanza la interfaz gráfica

## Componentes Principales

### root.py

El script principal que coordina la ejecución de la aplicación:

- `verificar_flutter()`: Asegura que Flutter esté instalado y configurado
- `ejecutar_frontend()`: Inicializa y ejecuta la interfaz de Flutter
- `main()`: Coordina la ejecución y manejo de errores

### Frontend (Flutter)

- **Theme**: Configuración centralizada de colores y estilos
- **Components**:
  - `Sidebar`: Barra lateral con navegación y menús desplegables
  - `Topbar`: Barra superior con título y controles
- **Views**:
  - `HomeView`: Vista principal que integra los componentes

### Sistema de Logging

- Registra eventos importantes en `logs/app.log`
- Diferentes niveles de log (INFO, DEBUG, ERROR)
- Rotación automática de archivos de log

## Desarrollo

### Agregar Nuevas Vistas

1. Crea un nuevo archivo en `a_front/lib/views/`
2. Implementa un widget de Flutter
3. Actualiza la navegación en el Sidebar

### Modificar el Tema

Edita `a_front/lib/theme/app_theme.dart` para cambiar:

- Colores
- Tipografía
- Estilos de componentes

## Próximos Pasos

- [ ] Implementación del backend
- [ ] Sistema de autenticación
- [ ] Base de datos
- [ ] API REST
- [ ] Tests automatizados

## Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crea un Pull Request

## Licencia

[Especificar licenci]
