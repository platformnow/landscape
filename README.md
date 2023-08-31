# [Landscape](https://backstage.io)

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

Internal Developer Portal for PlatformNow built on Backstage

Start the database in docker

```sh
make db
```

To start the app, run:

```sh
yarn install
yarn dev
```

## Docker Build

Build and run the docker images locally for development

```sh
# Build the backend
docker build -t landscape-backend -f Dockerfile.backend-buildsteps .

# Build the backend
docker build -t landscape-frontend -f Dockerfile.frontend-buildsteps .

# Run the database, frontend and backend
docker-compose up
```

## License

<!-- Keep full URL links to repo files because this README syncs from main to gh-pages.  -->
[Apache 2.0 License](https://github.com/platformnow/landscape/blob/master/LICENSE).
