.PHONY: build run stop clean

# Nombre de la imagen Docker
IMAGE_NAME=my-rest-api

# Construir la imagen Docker
build:
	docker build -t $(IMAGE_NAME) .

# Correr el contenedor
run:
	docker run -p 5000:5000 --name $(IMAGE_NAME)-container $(IMAGE_NAME)

# Detener el contenedor
stop:
	docker stop $(IMAGE_NAME)-container || true
	docker rm $(IMAGE_NAME)-container || true

# Limpiar imágenes y contenedores no usados
clean: stop
	docker system prune -f
