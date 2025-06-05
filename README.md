
# Proyecto Flutter + Python

Este proyecto implementa una aplicación de escritorio moderna usando **Flutter** para el frontend y **Python** para la orquestación y utilidades.

---

## Estructura del Proyecto

```

proyecto/

├── a_front/                    # Frontend con Flutter

│   ├── lib/

│   │   ├── main.dart           # Punto de entrada de Flutter

│   │   ├── components/         # Componentes reutilizables

│   │   │   ├── sidebar.dart    # Barra lateral de navegación

│   │   │   └── topbar.dart     # Barra superior

│   │   ├── theme/

│   │   │   └── app_theme.dart  # Colores y estilos globales

│   │   └── views/

│   │       └── home_view.dart  # Vista principal

│   └── pubspec.yaml            # Dependencias de Flutter

├── b_back/                     # Backend y utilidades Python

├── utils/                      # Utilidades compartidas (ej: logger.py)

├── logs/                       # Archivos de log

│   └── app.log

├── root.py                     # Script principal de Python

├── requirements.txt            # Dependencias Python

└── README.md                   # Este archivo

```

---

## Temas de Colores del Frontend

La aplicación utiliza un sistema de temas centralizado en `a_front/lib/theme/app_theme.dart`.

La paleta de colores principal es:

| Nombre        | Color    | Uso principal                                 |

|---------------|----------|-----------------------------------------------|

| background    | #DDD5D0  | Fondo general de la app                       |

| surface       | #CFC0BD  | Tarjetas, paneles, menús                      |

| secondary     | #B8B8AA  | Elementos secundarios, sidebar                |

| primary       | #7F9183  | AppBar, botones principales, topbar           |

| accent        | #586F6B  | Botones destacados, FAB, íconos activos       |

| onPrimary     | blanco   | Texto sobre primary                           |

| onBackground  | negro    | Texto sobre fondo general                     |

Puedes modificar estos colores en `app_theme.dart` para personalizar la apariencia de toda la app.

---

## Componentes Principales del Frontend

### Topbar

- Definido en `a_front/lib/components/topbar.dart`
- Es la barra superior de la aplicación.
- Usa el color `primary` como fondo y `onPrimary` para el texto.
- Ejemplo de uso de tema:

  ```dart

  color:AppTheme.primary,

  style:TextStyle(color:AppTheme.onPrimary),

  ```

### Sidebar

- Definido en `a_front/lib/components/sidebar.dart`
- Barra lateral de navegación con menús y submenús.
- Usa el color `secondary` o `surface` como fondo y `accent` para resaltar ítems activos.
- Permite navegación entre vistas y muestra badges de notificaciones.

### HomeView

- Definido en `a_front/lib/views/home_view.dart`
- Vista principal que integra el `Sidebar`, el `Topbar` y el contenido principal.
- Aplica el color de fondo global (`background`) y organiza la estructura general de la pantalla.

---

## Cómo modificar el tema

1. Edita los colores en `a_front/lib/theme/app_theme.dart`.
2. Usa los colores semánticos (`primary`, `background`, `surface`, etc.) en tus widgets.
3. Para cambiar el color de fondo de un widget:

   ```dart

   color:AppTheme.surface,

   ```
4. Para cambiar el color del texto:

   ```dart

   style:TextStyle(color:AppTheme.onPrimary),

   ```

---

## Desarrollo

- Para agregar nuevas vistas, crea un archivo en `a_front/lib/views/` y actualiza la navegación en el Sidebar.
- Para modificar el tema, edita `app_theme.dart`.
- Para agregar nuevos componentes reutilizables, usa la carpeta `components/`.

---

## Próximos Pasos

- [ ] Implementación del backend
- [ ] Sistema de autenticación
- [ ] Base de datos
- [ ] API REST
- [ ] Tests automatizados

---

## Contribuir

1. Haz fork del repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crea un Pull Request

---

## Licencia

[Especificar licencia]
