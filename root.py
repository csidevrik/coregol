import sys
from pathlib import Path
import os
import subprocess
import shutil
from utils.logger import get_logger

# Agregar el directorio raíz al PYTHONPATH
ROOT_DIR = Path(__file__).parent
sys.path.append(str(ROOT_DIR))

logger = get_logger('root')

def verificar_flutter():
    """Verifica si Flutter está instalado y en el PATH"""
    flutter_cmd = shutil.which("flutter")
    if not flutter_cmd:
        logger.error("""
Flutter no está instalado o no está en el PATH del sistema.
Por favor, sigue estos pasos para instalar Flutter:

1. Descarga Flutter desde: https://docs.flutter.dev/get-started/install
2. Extrae el archivo en una ubicación de tu elección (ej: C:\\src\\flutter)
3. Agrega la carpeta flutter\\bin al PATH del sistema
4. Reinicia la terminal
5. Verifica la instalación ejecutando: flutter doctor

Para más información visita: https://docs.flutter.dev/get-started/install/windows
""")
        sys.exit(1)
    return flutter_cmd

# def ejecutar_frontend():
#     """Ejecuta la aplicación frontend de Flutter"""
#     frontend_path = Path("a_front")
#     if not frontend_path.exists():
#         logger.error("No se encuentra el directorio frontend en a_front/")
#         sys.exit(1)
    
#     try:
#         # Verificar Flutter
#         flutter_cmd = verificar_flutter()
#         logger.info("Flutter encontrado en: %s", flutter_cmd)
        
#         logger.info("Iniciando frontend Flutter...")
#         env = os.environ.copy()
        
#         # Primero, asegurarse de que las dependencias están instaladas
#         logger.info("Instalando dependencias de Flutter...")
#         result = subprocess.run(
#             [flutter_cmd, "pub", "get"],
#             cwd=frontend_path,
#             env=env,
#             check=False,  # No lanzar excepción si falla
#             capture_output=True,
#             text=True
#         )
        
#         if result.returncode != 0:
#             logger.error("Error al instalar dependencias:")
#             logger.error(result.stderr)
#             sys.exit(1)
            
#         # Inicializar proyecto Flutter si es necesario
#         if not (frontend_path / ".metadata").exists():
#             logger.info("Inicializando proyecto Flutter...")
#             result = subprocess.run(
#                 [flutter_cmd, "create", "."],
#                 cwd=frontend_path,
#                 env=env,
#                 check=False,
#                 capture_output=True,
#                 text=True
#             )
#             if result.returncode != 0:
#                 logger.error("Error al inicializar proyecto Flutter:")
#                 logger.error(result.stderr)
#                 sys.exit(1)
        
#         # Luego, ejecutar la aplicación Flutter
#         proceso_frontend = subprocess.Popen(
#             [flutter_cmd, "run", "-d", "windows"],
#             cwd=frontend_path,
#             env=env
#         )
        
#         logger.debug("Proceso frontend iniciado con PID: %d", proceso_frontend.pid)
#         return proceso_frontend
#     except Exception as e:
#         logger.exception("Error al iniciar el frontend: %s", str(e))
#         sys.exit(1)

# def main():
#     """Función principal que coordina la ejecución de la aplicación"""
#     logger.info("="*50)
#     logger.info("Iniciando aplicación principal")
#     logger.info("="*50)
    
#     # Inicia el frontend
#     proceso_frontend = ejecutar_frontend()
    
#     try:
#         # Mantiene el proceso principal ejecutándose
#         logger.info("Esperando a que el frontend termine...")
#         proceso_frontend.wait()
#     except KeyboardInterrupt:
#         logger.warning("Señal de interrupción recibida")
#         logger.info("Cerrando aplicación...")
#         proceso_frontend.terminate()
#         logger.info("Aplicación cerrada correctamente")
#         sys.exit(0)
#     except Exception as e:
#         logger.exception("Error inesperado durante la ejecución: %s", str(e))
#         proceso_frontend.terminate()
#         sys.exit(1)

# if __name__ == "__main__":
#     main() 

import json
import platform

def elegir_dispositivo(flutter_cmd, env):
    """
    Devuelve un deviceId soportado por Flutter, priorizando escritorio nativo.
    """
    # Prioridad por plataforma
    prioridades = {
        "Linux":  ["linux", "chrome"],
        "Windows":["windows", "chrome"],
        "Darwin": ["macos", "chrome"],
    }
    preferidos = prioridades.get(platform.system(), ["chrome"])

    # Lee dispositivos disponibles en formato máquina
    res = subprocess.run(
        [flutter_cmd, "devices", "--machine"],
        env=env, capture_output=True, text=True, check=False
    )
    if res.returncode != 0:
        logger.error("No se pudo listar dispositivos:\n%s", res.stderr)
        sys.exit(1)

    try:
        devices = json.loads(res.stdout)
    except Exception as e:
        logger.error("Salida inesperada de 'flutter devices --machine': %s", e)
        logger.debug("STDOUT: %s", res.stdout)
        sys.exit(1)

    ids = {d.get("id"): d for d in devices if d.get("isSupported")}

    # selecciona por preferencia
    for preferido in preferidos:
        for dev_id, meta in ids.items():
            if meta.get("targetPlatform", "").startswith(preferido) or dev_id == preferido:
                return dev_id

    # si no hay preferidos, toma el primero disponible
    if ids:
        return next(iter(ids.keys()))

    logger.error("No hay dispositivos soportados disponibles.")
    sys.exit(1)

def ejecutar_frontend():
    """Ejecuta la aplicación frontend de Flutter"""
    frontend_path = Path("a_front")
    if not frontend_path.exists():
        logger.error("No se encuentra el directorio frontend en a_front/")
        sys.exit(1)
    
    try:
        flutter_cmd = verificar_flutter()
        logger.info("Flutter encontrado en: %s", flutter_cmd)
        
        env = os.environ.copy()

        logger.info("Instalando dependencias de Flutter...")
        result = subprocess.run(
            [flutter_cmd, "pub", "get"],
            cwd=frontend_path, env=env,
            check=False, capture_output=True, text=True
        )
        if result.returncode != 0:
            logger.error("Error al instalar dependencias:\n%s", result.stderr)
            sys.exit(1)

        # Inicializar proyecto si falta metadata
        if not (frontend_path / ".metadata").exists():
            logger.info("Inicializando proyecto Flutter...")
            result = subprocess.run(
                [flutter_cmd, "create", "."],
                cwd=frontend_path, env=env,
                check=False, capture_output=True, text=True
            )
            if result.returncode != 0:
                logger.error("Error al inicializar proyecto Flutter:\n%s", result.stderr)
                sys.exit(1)

        # Elegir dispositivo adecuado
        device_id = elegir_dispositivo(flutter_cmd, env)
        logger.info("Ejecutando en el dispositivo: %s", device_id)

        proceso_frontend = subprocess.Popen(
            [flutter_cmd, "run", "-d", device_id],
            cwd=frontend_path, env=env
        )
        logger.debug("Proceso frontend iniciado con PID: %d", proceso_frontend.pid)
        return proceso_frontend

    except Exception as e:
        logger.exception("Error al iniciar el frontend: %s", str(e))
        sys.exit(1)

def main():
    """Función principal que coordina la ejecución de la aplicación"""
    logger.info("="*50)
    logger.info("Iniciando aplicación principal")
    logger.info("="*50)
    
    # Inicia el frontend
    proceso_frontend = ejecutar_frontend()
    
    try:
        # Mantiene el proceso principal ejecutándose
        logger.info("Esperando a que el frontend termine...")
        proceso_frontend.wait()
    except KeyboardInterrupt:
        logger.warning("Señal de interrupción recibida")
        logger.info("Cerrando aplicación...")
        proceso_frontend.terminate()
        logger.info("Aplicación cerrada correctamente")
        sys.exit(0)
    except Exception as e:
        logger.exception("Error inesperado durante la ejecución: %s", str(e))
        proceso_frontend.terminate()
        sys.exit(1)

if __name__ == "__main__":
    main() 