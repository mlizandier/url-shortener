## start: Build and start all services
start:
	docker compose up --build -d

## stop: Stop all services (preserves volumes)
stop:
	docker compose stop

## down: Stop and remove all services and volumes
down:
	docker compose down -v

## db.migrate: Run Prisma migrations
db.migrate:
	docker compose exec api npx prisma migrate deploy
