import flet as ft
from pathlib import Path
import sys

# Configuración de rutas
BASE_DIR = Path(__file__).parent
ASSETS_DIR = BASE_DIR / "assets"

# Importaciones
from utils.logger import get_logger
from .views.home import HomeView
from .theme import THEME, BG_COLOR

logger = get_logger('frontend')

def init_app(page: ft.Page):
    logger.info("Inicializando aplicación Flet")
    
    # Configuración del tema y página
    page.theme = THEME
    page.bgcolor = BG_COLOR
    page.padding = 0
    page.spacing = 0
    page.title = "Mi Aplicación"
    
    # Configuración de la ventana
    page.window.width = 1200
    page.window.height = 800
    page.window.resizable = True
    page.window.icon = str(ASSETS_DIR / "icon.ico")

    def route_change(route):
        page.views.clear()
        page.views.append(
            ft.View(
                "/",
                [HomeView()],
                padding=0,
                bgcolor=BG_COLOR,
            )
        )
        page.update()

    page.on_route_change = route_change
    page.go('/')

def main():
    logger.info("Iniciando frontend con Flet")
    ft.app(
        target=init_app,
        assets_dir=str(ASSETS_DIR)
    )

if __name__ == "__main__":
    main() 