# Imagen base de Python
FROM python:3.11-slim

# Establece directorio de trabajo
WORKDIR /app

# Copia e instala dependencias
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copia todo el contenido de la carpeta app/ al contenedor
COPY app/ app/

# Expón el puerto usado por FastAPI
EXPOSE 8000

# Comando para ejecutar FastAPI desde el archivo main.py dentro de /app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

