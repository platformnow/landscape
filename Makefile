.PHONY: clean up docker-build down helm-setup helm-clean release helm-tag init apply diff sync

LOCAL_REPOSITORY = landscape
APP_NAME = landscape
CHARTS_DIRECTORY := charts/${APP_NAME}
PREVIEW_DIRECTORY := charts/preview
OS := $(shell uname)
ENVIRONMENT ?= local-preview
TAG ?= latest
BUILD_PLATFORM ?= linux/amd64

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

local-docker: docker-local-build-frontend docker-local-build-backend

docker-build-frontend:
	yarn install
	yarn tsc
	yarn workspace app build --config ../../app-config.frontend-production.yaml
	docker build --platform=${BUILD_PLATFORM} -t ${LOCAL_REPOSITORY}/landscape-frontend -t registry.lenderos.com/${LOCAL_REPOSITORY}/landscapefrontend:${TAG} -f Dockerfile.frontend .

docker-local-build-frontend:
	yarn install
	yarn tsc
	yarn workspace app build --config ../../app-config.yaml
	docker build --platform=linux/arm64 -t ${LOCAL_REPOSITORY}/landscape-frontend -t registry.lenderos.com/${LOCAL_REPOSITORY}/landscapefrontend:${TAG} -f Dockerfile.frontend .

docker-build-backend:
	yarn install
	yarn tsc
	yarn build
	docker build --platform=${BUILD_PLATFORM} -t ${LOCAL_REPOSITORY}/landscape-backend -t registry.lenderos.com/${LOCAL_REPOSITORY}/landscape-backend:${TAG} -f Dockerfile.backend .

docker-local-build-backend:
	yarn install
	yarn tsc
	yarn build
	docker build --platform=linux/arm64 -t ${LOCAL_REPOSITORY}/landscape-backend -t registry.lenderos.com/${LOCAL_REPOSITORY}/landscape-backend:${TAG} -f Dockerfile.backend .

docker-push-frontend:
	docker push registry.lenderos.com/${LOCAL_REPOSITORY}/landscape-frontend:${TAG}

docker-push-backend:
	docker push registry.lenderos.com/${LOCAL_REPOSITORY}/landscape-backend:${TAG}

down:
	@docker-compose down  --remove-orphans

clean:
	@rm -rf .volumes/
	@rm -rf ~/${APP_NAME}-data

docker-release: bump-version docker-push-release
	@echo "Built ${BUILD_VERSION} version, pushed to ${DOCKER_REGISTRY}${APP_NAME} and tagged as ${RELEASE_VERSION}, ${BUILD_VERSION}"

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

docker-push-release:
	@echo "$DOCKER_AUTH_CONFIG" > /kaniko/.docker/config.json
	@/kaniko/executor --context ./ --dockerfile ./Dockerfile --destination ${DOCKER_REGISTRY}${APP_NAME}:${BUILD_VERSION} --destination ${DOCKER_REGISTRY}${APP_NAME}:${RELEASE_VERSION}
