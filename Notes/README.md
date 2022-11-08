# Commands to know

- start development environment

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

- stop development evnirnment

docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v

- if you make any change to "Dockerfile" you need to run the docker-compose file with the "--build" flag

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
