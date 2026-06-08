dev-infra:
	docker compose -f infra/docker-compose.yml up

dev-web:
	npm run dev:web

dev-api:
	npm run dev:api

dev-realtime:
	npm run dev:realtime

dev-worker:
	npm run dev:worker

dev-agent:
	npm run dev:agent

dev-desktop:
	npm run dev:desktop

dev-rust:
	npm run dev:rust

test-web:
	npm run test:web

test-python:
	npm run test:python-compile

test-rust:
	npm run test:rust
