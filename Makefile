.PHONY: clean up docker-build down helm-setup helm-clean release helm-tag init apply diff sync

LOCAL_REPOSITORY = platformnow
APP_NAME = landscape
OS := $(shell uname)
TAG ?= latest
BUILD_VERSION ?= $(shell cat package.json | grep version | head -1 | awk -F: '{ print $$2 }' | sed 's/[", ]//g')
RELEASE_VERSION ?= $(shell cat package.json | grep version | head -1 | awk -F: '{ print $$2 }' | sed 's/[", ]//g')
###################
# DOCKER COMMANDS #
###################
up:
	docker-compose up

upd:
	docker-compose up -d

db:
	docker-compose up db -d

clean: rm-volume

rm-volume:
	docker volume rm landscape_db_data

down:
	@docker-compose down  --remove-orphans

clean:
	@rm -rf .volumes/
	@rm -rf ~/${APP_NAME}-data

docker-build-frontend:
	docker build -t landscape-frontend -t ghcr.io/platformnow/landscape-frontend:${TAG} -f Dockerfile.frontend-buildsteps .

docker-build-backend:
	docker build -t landscape-backend -t ghcr.io/platformnow/landscape-backend:${TAG} -f Dockerfile.backend-buildsteps .

docker-build-all: docker-build-frontend docker-build-backend

docker-push-frontend:
	docker push ghcr.io/${LOCAL_REPOSITORY}/landscape-frontend:${TAG}

docker-push-backend:
	docker push ghcr.io/${LOCAL_REPOSITORY}/landscape-backend:${TAG}

docker-push-all: docker-push-frontend docker-push-backend

bump-version:
ifeq ($(OS),Darwin)
	@sed -i "" -e "s/\"version\":.*/\"version\": \"${BUILD_VERSION}\",/g" package.json
	@sed -i "" -e "s/\"version\":.*/\"version\": \"${BUILD_VERSION}\",/g" packages/app/package.json
	@sed -i "" -e "s/\"version\":.*/\"version\": \"${BUILD_VERSION}\",/g" packages/backend/package.json
else ifeq ($(OS),Linux)
	@sed -i -e "s/\"version\":.*/\"version\": \"${BUILD_VERSION}\",/g" package.json
	@sed -i -e "s/\"version\":.*/\"version\": \"${BUILD_VERSION}\",/g" packages/app/package.json
	@sed -i -e "s/\"version\":.*/\"version\": \"${BUILD_VERSION}\",/g" packages/backend/package.json
else
	@echo "platfrom $(OS) not supported to release from"
	exit -1
endif