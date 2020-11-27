dev:
	docker-compose up

start:
	docker-compose up -d

build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

login-client:
	docker exec -it fable_client sh

login-server:
	docker exec -it fable_server sh

login-database:
	docker exec -it fable_database mongo

login-redis: 
	docker exec -it fable_redis redis-cli