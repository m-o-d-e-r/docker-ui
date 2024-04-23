
run:
	docker compose --env-file .env up --build

run_dev:
	docker compose --env-file .env.dev up --build
