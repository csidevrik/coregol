import logging
from pathlib import Path
from logging.handlers import RotatingFileHandler
import sys
import os

# Crear el directorio de logs si no existe
log_dir = Path("logs")
log_dir.mkdir(exist_ok=True)

# Asegurarse de que el archivo de log existe
log_file = log_dir / 'app.log'
if not log_file.exists():
    log_file.touch()

# Configurar el logger
logger = logging.getLogger('app')
logger.setLevel(logging.DEBUG)  # Asegurarse de que captura todos los niveles

# Formato del log más detallado
log_format = logging.Formatter(
    '%(asctime)s - %(name)s - [%(levelname)s] - %(filename)s:%(lineno)d - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# Handler para archivo con manejo de errores
try:
    file_handler = RotatingFileHandler(
        log_file,
        maxBytes=10485760,  # 10MB
        backupCount=5,
        encoding='utf-8'
    )
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(log_format)
    logger.addHandler(file_handler)
except Exception as e:
    print(f"Error configurando file handler: {e}")

# Handler para consola
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setLevel(logging.INFO)
console_handler.setFormatter(log_format)
logger.addHandler(console_handler)

# Log de prueba al iniciar el módulo
logger.info("Sistema de logging iniciado correctamente")

# Asegurar permisos de escritura en el archivo de log
try:
    os.chmod(log_file, 0o666)
except Exception as e:
    print(f"Error configurando permisos del archivo de log: {e}")

def get_logger(name: str = None) -> logging.Logger:
    """
    Obtiene un logger configurado para el módulo especificado
    
    Args:
        name (str): Nombre del módulo (opcional)
        
    Returns:
        logging.Logger: Logger configurado
    """
    child_logger = logging.getLogger(name if name else 'app')
    # Log de prueba al crear un nuevo logger
    child_logger.debug(f"Logger '{name}' creado")
    return child_logger 