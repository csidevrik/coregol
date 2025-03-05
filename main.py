import sys
import subprocess
from pathlib import Path

def ejecutar_frontend():
    """Ejecuta la aplicación frontend de Flet"""
    frontend_path = Path("a_front/main.py")
    if not frontend_path.exists():
        print("Error: No se encuentra el archivo frontend en a_front/main.py")
        sys.exit(1)
    
    try:
        # Ejecuta el frontend como un subproceso
        proceso_frontend = subprocess.Popen([sys.executable, str(frontend_path)])
        return proceso_frontend
    except Exception as e:
        print(f"Error al iniciar el frontend: {e}")
        sys.exit(1)

def main():
    """Función principal que coordina la ejecución de la aplicación"""
    print("Iniciando aplicación...")
    
    # Inicia el frontend
    proceso_frontend = ejecutar_frontend()
    
    try:
        # Mantiene el proceso principal ejecutándose
        proceso_frontend.wait()
    except KeyboardInterrupt:
        print("\nCerrando aplicación...")
        proceso_frontend.terminate()
        sys.exit(0)

if __name__ == "__main__":
    main()
