dev:
	docker-compose up --build

build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

login-server:
	docker exec -it server sh

login-database:
	docker exec -it database mongo

login-redis: 
	docker exec -it redis redis-cli