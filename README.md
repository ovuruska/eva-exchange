# Eva eXchange

Welcome to Eva eXchange, a modern, robust, and scalable trading platform designed to provide a seamless trading experience. Whether you are a trader or a developer, Eva eXchange offers a comprehensive set of features and APIs to meet your needs.

## Table of Contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
- [Configuration](#configuration)
    - [Local Environment](#local-environment)
    - [Docker Compose Environment](#docker-compose-environment)
- [Building and Running the Project](#building-and-running-the-project)
- [Accessing the API Documentation](#accessing-the-api-documentation)

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have Docker and Docker Compose installed on your machine. If not, you can download them from the [official website](https://www.docker.com/get-started).


## Configuration

The configuration steps differ slightly based on whether you are running the project locally or using Docker Compose.

### Local Environment

If you are running the project locally, copy the `.env.local` file and name the copy as `.env`:

```bash
cp .env.local .env
```

This will ensure that the necessary environment variables are set for running the project locally.

### Docker Compose Environment

If you are using Docker Compose, copy the `.env.docker` file and name the copy as `.env`:

```bash
cp .env.docker .env
```

This will ensure that the necessary environment variables are set for running the project with Docker Compose.

To build and run the project, execute the following commands in the project's root directory:

```bash
docker-compose build && docker-compose up
```

This will build the Docker images and start the containers necessary for running Eva eXchange.

### Accessing the API Documentation

In the development environment, the API documentation is available via Swagger at the `/docs` endpoint. Simply navigate to [http://localhost:8000/docs](http://localhost:8000/docs)


