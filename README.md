# Eva eXchange

Welcome to Eva eXchange, a modern, robust, and scalable trading platform designed to provide a seamless trading experience. Whether you are a trader or a developer, Eva eXchange offers a comprehensive set of features and APIs to meet your needs.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have Docker and Docker Compose installed on your machine. If not, you can download them from the [official website](https://www.docker.com/get-started).

### Configuration

Before you start, copy the `.env.local` file and name the copy as `.env`:

```bash
cp .env.local .env
```

This will ensure that the necessary environment variables are set for running the project.

### Building and Running the Project

To build and run the project, execute the following commands in the project's root directory:

```bash
docker-compose build && docker-compose up
```

This will build the Docker images and start the containers necessary for running Eva eXchange.

### Accessing the API Documentation

In the development environment, the API documentation is available via Swagger at the `/docs` endpoint. Simply navigate to:

```plaintext
http://localhost:<PORT>/docs
```

Replace `<PORT>` with the port number on which the application is running, as specified in your `.env` file.

